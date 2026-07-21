import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-summary-widget.html',
  styleUrl: './course-summary-widget.css',
})
export class CourseSummaryWidget implements OnInit, OnDestroy {
  totalCourses = 0;
  passedCourses = 0;
  failedCourses = 0;
  pendingCourses = 0;
  courses: Course[] = [];
  private destroy$ = new Subject<void>();

  constructor(private courseService: CourseService) {
    console.log('CourseSummaryWidget constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('CourseSummaryWidget initialised');
    this.loadSummary();
  }

  loadSummary(): void {
    this.courseService
      .getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
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
        },
        error: (error) => {
          console.error('❌ Failed to load course summary:', error);
          this.courses = [];
          this.totalCourses = 0;
          this.passedCourses = 0;
          this.failedCourses = 0;
          this.pendingCourses = 0;
        },
      });
  }

  addDemoCourse(): void {
    console.log('➕ Adding demo course via widget...');

    this.courseService
      .addCourse({
        name: 'Demo Course ' + (this.totalCourses + 1),
        code: 'DEMO' + (this.totalCourses + 1),
        credits: 3,
        gradeStatus: 'pending',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.loadSummary();
        },
        error: (error) => {
          console.error('❌ Failed to add demo course:', error);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
