import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget implements OnInit {
  totalCourses = 0;
  passedCourses = 0;
  failedCourses = 0;
  pendingCourses = 0;
  courses: Course[] = [];

  constructor(private courseService: CourseService) {
    console.log('CourseSummaryWidget constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('CourseSummaryWidget initialised');
    this.loadSummary();
  }

  loadSummary(): void {
    this.courses = this.courseService.getCourses();
    this.totalCourses = this.courses.length;
    this.passedCourses = this.courses.filter((c) => c.gradeStatus === 'passed').length;
    this.failedCourses = this.courses.filter((c) => c.gradeStatus === 'failed').length;
    this.pendingCourses = this.courses.filter((c) => c.gradeStatus === 'pending').length;

    console.log('📊 Summary loaded:', {
      total: this.totalCourses,
      passed: this.passedCourses,
      failed: this.failedCourses,
      pending: this.pendingCourses,
    });
  }

  addDemoCourse(): void {
    console.log('➕ Adding demo course via widget...');

    this.courseService.addCourse({
      name: 'Demo Course ' + (this.totalCourses + 1),
      code: 'DEMO' + (this.totalCourses + 1),
      credits: 3,
      gradeStatus: 'pending',
    });

    // Reload summary to show new count
    this.loadSummary();
  }
}
