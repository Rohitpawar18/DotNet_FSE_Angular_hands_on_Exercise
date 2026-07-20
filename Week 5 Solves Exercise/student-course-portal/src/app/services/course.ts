import { Service } from '@angular/core';
import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
// @Service()
export class CourseService {
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

  constructor() {
    console.log('✅ CourseService created (singleton instance)');
  }

  getCourses(): Course[] {
    console.log('🔍 CourseService.getCourses() called - returning', this.courses.length, 'courses');
    return this.courses.slice(); // Return copy, not reference
  }

  getCourseById(id: number): Course | undefined {
    console.log('🔍 CourseService.getCourseById(', id, ') called');
    const course = this.courses.find((c) => c.id === id);
    if (course) {
      console.log('✅ Found course:', course.name);
    } else {
      console.log('❌ Course with ID', id, 'not found');
    }
    return course;
  }

  addCourse(course: Omit<Course, 'id'>): void {
    console.log('➕ Adding new course:', course.name);

    // Generate new ID
    const newId = Math.max(...this.courses.map((c) => c.id), 0) + 1;

    // Create course with new ID
    const newCourse: Course = {
      ...course,
      id: newId,
    };

    // Add to array
    this.courses.push(newCourse);

    console.log('✅ Course added successfully. Total courses now:', this.courses.length);
  }

  getCourseCount(): number {
    return this.courses.length;
  }

  deleteCourse(id: number): void {
    console.log('🗑️ Deleting course with ID:', id);
    const initialLength = this.courses.length;
    this.courses = this.courses.filter((c) => c.id !== id);
    if (this.courses.length < initialLength) {
      console.log('✅ Course deleted. Total courses now:', this.courses.length);
    } else {
      console.log('❌ Course not found');
    }
  }
}
