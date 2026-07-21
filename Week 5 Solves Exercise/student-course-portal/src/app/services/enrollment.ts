import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { catchError, map, retry, switchMap, tap } from 'rxjs/operators';
import { CourseService } from './course';
import { Course } from '../models/course.model';

interface EnrollmentRecord {
  id: number;
  courseId: number;
  studentId: string;
}

@Injectable({
  providedIn: 'root',
})
// @Service()
export class Enrollment {
  private enrolledCourseIds: number[] = [];
  private listeners: Array<() => void> = [];
  private readonly apiUrl = 'http://localhost:3000/enrollments';

  constructor(
    private http: HttpClient,
    private courseService: CourseService,
  ) {
    console.log('✅ EnrollmentService created - CourseService injected');
  }

  enroll(courseId: number): Observable<EnrollmentRecord> {
    if (this.isEnrolled(courseId)) {
      console.log(`⚠️  Already enrolled in course ${courseId}`);
      return throwError(() => new Error(`Already enrolled in course ${courseId}`));
    }

    const payload = {
      courseId,
      studentId: 'student-1',
    };

    console.log('➕ Creating enrollment:', payload);

    return this.http.post<EnrollmentRecord>(this.apiUrl, payload).pipe(
      tap((enrollment) => {
        this.enrolledCourseIds = [...this.enrolledCourseIds, enrollment.courseId];
        console.log(`✅ Enrolled in course ID: ${courseId}`);
        this.notifyListeners();
      }),
      catchError((error) => {
        console.error('❌ Failed to enroll in course:', error);
        return throwError(
          () => new Error(`Unable to enroll in course ${courseId}: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  unenroll(courseId: number): Observable<void> {
    if (!this.isEnrolled(courseId)) {
      console.log(`⚠️  Not enrolled in course ${courseId}`);
      return throwError(() => new Error(`Not enrolled in course ${courseId}`));
    }

    console.log('🗑️ Looking up enrollment to remove for course ID:', courseId);

    return this.http.get<EnrollmentRecord[]>(this.apiUrl).pipe(
      switchMap((enrollments) => {
        const enrollment = enrollments.find((entry) => entry.courseId === courseId);

        if (!enrollment) {
          return throwError(() => new Error(`Enrollment not found for course ${courseId}`));
        }

        return this.http.delete<void>(`${this.apiUrl}/${enrollment.id}`).pipe(
          tap(() => {
            this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
            console.log(`✅ Unenrolled from course ID: ${courseId}`);
            this.notifyListeners();
          }),
        );
      }),
      catchError((error) => {
        console.error('❌ Failed to unenroll from course:', error);
        return throwError(
          () =>
            new Error(`Unable to unenroll from course ${courseId}: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Observable<Course[]> {
    console.log('📚 Loading enrolled courses from JSON Server');

    return this.http.get<EnrollmentRecord[]>(this.apiUrl).pipe(
      retry(2),
      tap((enrollments) => {
        this.enrolledCourseIds = enrollments.map((enrollment) => enrollment.courseId);
        console.log(`✅ Loaded ${enrollments.length} enrollment records`);
      }),
      map((enrollments) => enrollments.map((enrollment) => enrollment.courseId)),
      switchMap((courseIds) => {
        if (courseIds.length === 0) {
          return of([] as Course[]);
        }

        return forkJoin(
          courseIds.map((courseId) =>
            this.http.get<Course>(`http://localhost:3000/courses/${courseId}`),
          ),
        );
      }),
      tap((courses) => {
        console.log(`📚 Retrieved ${courses.length} enrolled courses`);
      }),
      catchError((error) => {
        console.error('❌ Failed to load enrolled courses:', error);
        return throwError(
          () => new Error(`Unable to load enrolled courses: ${this.getErrorMessage(error)}`),
        );
      }),
    );
  }

  getEnrolledCount(): number {
    return this.enrolledCourseIds.length;
  }

  getEnrolledIds(): number[] {
    return [...this.enrolledCourseIds]; // Return copy
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter((currentListener) => currentListener !== listener);
    };
  }

  private notifyListeners(): void {
    for (const listener of this.listeners) {
      listener();
    }
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
