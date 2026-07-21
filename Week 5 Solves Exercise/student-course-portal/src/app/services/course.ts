import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, retry, tap } from 'rxjs/operators';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
// @Service()
export class CourseService {
  private readonly apiUrl = 'http://localhost:3000/courses';

  private courses: Course[] = [
    {
      id: 1,
      name: 'Data Structures',
      code: 'CS101',
      credits: 4,
      gradeStatus: 'passed',
    },
    {
      id: 2,
      name: 'Web Development',
      code: 'CS201',
      credits: 3,
      gradeStatus: 'pending',
    },
    {
      id: 3,
      name: 'Database Management',
      code: 'CS301',
      credits: 4,
      gradeStatus: 'failed',
    },
    {
      id: 4,
      name: 'Algorithms',
      code: 'CS102',
      credits: 3,
      gradeStatus: 'pending',
    },
    {
      id: 5,
      name: 'Operating Systems',
      code: 'CS401',
      credits: 4,
      gradeStatus: 'passed',
    },
  ];

  constructor(private http: HttpClient) {
    console.log('✅ CourseService created (singleton instance)');
  }

  /**
   * Load all courses from JSON Server.
   */
  getCourses(): Observable<Course[]> {
    console.log('🔍 CourseService.getCourses() called - loading courses from HTTP');

    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      map((courses) => courses.filter((course) => course.credits > 0)),
      tap((courses) => {
        this.courses = courses;
        console.log('✅ Courses loaded from server:', courses.length);
      }),
      catchError((error) => {
        console.error('❌ Failed to load courses:', error);
        console.warn('⚠️ Falling back to local course data');
        return of(this.courses.slice());
      }),
    );
  }

  /**
   * Load a single course by id from JSON Server.
   */
  getCourseById(id: number): Observable<Course | undefined> {
    console.log('🔍 CourseService.getCourseById(', id, ') called');

    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      tap((course) => {
        console.log('✅ Found course:', course.name);
      }),
      catchError((error) => {
        console.error('❌ Course with ID', id, 'not found or could not be loaded:', error);
        const fallbackCourse = this.courses.find((course) => course.id === id);

        if (fallbackCourse) {
          console.warn('⚠️ Falling back to local course data for ID:', id);
          return of(fallbackCourse);
        }

        return throwError(
          () => new Error(`Unable to load course ${id}: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  /**
   * Create a course on JSON Server.
   */
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    console.log('➕ Adding new course:', course.name);

    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap((newCourse) => {
        this.courses = [...this.courses, newCourse];
        console.log('✅ Course added successfully:', newCourse);
      }),
      catchError((error) => {
        console.error('❌ Failed to add course:', error);
        return throwError(() => new Error(`Unable to add course: ${this.getErrorMessage(error)}`));
      }),
    );
  }

  getCourseCount(): number {
    return this.courses.length;
  }

  /**
   * Update a course on JSON Server.
   */
  updateCourse(id: number, course: Partial<Course>): Observable<Course> {
    console.log('✏️ Updating course with ID:', id, course);

    return this.http.put<Course>(`${this.apiUrl}/${id}`, course).pipe(
      tap((updatedCourse) => {
        this.courses = this.courses.map((existingCourse) =>
          existingCourse.id === id ? { ...existingCourse, ...updatedCourse } : existingCourse,
        );
        console.log('✅ Course updated successfully:', updatedCourse);
      }),
      catchError((error) => {
        console.error('❌ Failed to update course:', error);
        return throwError(
          () => new Error(`Unable to update course ${id}: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  /**
   * Delete a course from JSON Server.
   */
  deleteCourse(id: number): Observable<void> {
    console.log('🗑️ Deleting course with ID:', id);

    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this.courses = this.courses.filter((course) => course.id !== id);
        console.log('✅ Course deleted. Total courses now:', this.courses.length);
      }),
      catchError((error) => {
        console.error('❌ Failed to delete course:', error);
        return throwError(
          () => new Error(`Unable to delete course ${id}: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'object' && error !== null && 'message' in error) {
      return String((error as { message?: unknown }).message ?? 'Unknown error');
    }

    return 'Unknown error';
  }
}
