import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Enrollment } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit, OnDestroy {
  studentName = 'John Doe';
  studentEmail = 'john.doe@university.edu';
  studentId = 'STU-2024-001';
  major = 'Computer Science';
  gpa = 3.8;
  semester = 'Fall 2024';

  enrolledCourses: Course[] = [];
  private unsubscribeFromEnrollment?: () => void;

  constructor(private enrollmentService: Enrollment) {
    console.log('StudentProfileComponent constructor - EnrollmentService injected');
  }

  ngOnInit(): void {
    console.log('StudentProfileComponent initialised');
    this.loadEnrolledCourses();
    this.unsubscribeFromEnrollment = this.enrollmentService.subscribe(() => {
      this.loadEnrolledCourses();
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeFromEnrollment?.();
  }

  loadEnrolledCourses(): void {
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
    console.log(`Loaded ${this.enrolledCourses.length} enrolled courses`);
  }

  refreshEnrolledCourses(): void {
    console.log('Refreshing enrolled courses...');
    this.enrolledCourses = this.enrollmentService.getEnrolledCourses();
    console.log(`Refreshed: ${this.enrolledCourses.length} enrolled courses`);
  }

  getEnrollmentStatus(): string {
    const count = this.enrollmentService.getEnrolledCount();
    if (count === 0) {
      return 'Not enrolled in any courses';
    } else if (count === 1) {
      return `Enrolled in 1 course`;
    } else {
      return `Enrolled in ${count} courses`;
    }
  }
}
