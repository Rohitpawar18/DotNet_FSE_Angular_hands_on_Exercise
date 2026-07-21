import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit, OnDestroy {
  courseId: number | null = null;
  course: Course | undefined = undefined;

  isLoading = false;
  notFound = false;
  errorMessage = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
  ) {
    console.log('CourseDetailComponent constructed');
  }

  ngOnInit(): void {
    console.log('CourseDetailComponent initialised');
    this.loadCourseDetail();
  }

  loadCourseDetail(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      console.log('❌ No course ID in URL');
      this.notFound = true;
      this.isLoading = false;
      return;
    }
    this.courseId = parseInt(id, 10);
    console.log('🔍 CourseDetailComponent - Loading course ID:', this.courseId);

    this.courseService
      .getCourseById(this.courseId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (course) => {
          this.course = course;
          this.isLoading = false;
          console.log('Course detail loaded:', course?.name);

          if (!course) {
            console.log('❌ Course not found:', this.courseId);
            this.notFound = true;
          }
        },
        error: (error) => {
          console.error('Error loading course:', error);
          this.errorMessage = error.message;
          this.notFound = true;
          this.isLoading = false;
        },
      });
  }

  goBackToCourses(): void {
    console.log('Navigating back to course list');
    this.router.navigate(['/courses']);
  }

  enrollNow(): void {
    if (this.course) {
      console.log('Enrolling in course:', this.course.name);
      // Later: Call enrollment service
      alert(`Enrolled in ${this.course.name}`);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
