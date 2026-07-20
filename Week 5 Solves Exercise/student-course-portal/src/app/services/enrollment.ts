import { Injectable, Service } from '@angular/core';
import { CourseService } from './course';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root',
})
// @Service()
export class Enrollment {
  private enrolledCourseIds: number[] = [];
  private listeners: Array<() => void> = [];

  constructor(private courseService: CourseService) {
    console.log('✅ EnrollmentService created - CourseService injected');
  }

  enroll(courseId: number): void {
    if (this.isEnrolled(courseId)) {
      console.log(`⚠️  Already enrolled in course ${courseId}`);
      return;
    }

    this.enrolledCourseIds.push(courseId);
    const course = this.courseService.getCourseById(courseId);
    console.log(`✅ Enrolled in course: ${course?.name} (ID: ${courseId})`);
    this.notifyListeners();
  }

  unenroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      console.log(`⚠️  Not enrolled in course ${courseId}`);
      return;
    }

    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
    const course = this.courseService.getCourseById(courseId);
    console.log(`✅ Unenrolled from course: ${course?.name} (ID: ${courseId})`);
    this.notifyListeners();
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourses(): Course[] {
    const enrolled = this.enrolledCourseIds
      .map((id) => this.courseService.getCourseById(id))
      .filter((course): course is Course => course !== undefined);

    console.log(`📚 Retrieved ${enrolled.length} enrolled courses`);
    return enrolled;
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
}
