import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  isLoading = true;
  courses: Course[] = [];
  searchTerm = '';
  errorMessage = '';

  selectedCourseId: number | null = null;
  private destroy$ = new Subject<void>();
  private loadingTimeoutId?: ReturnType<typeof setTimeout>;

  // ✅ CHANGE THIS SECTION
  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router, // ✅ ADD THIS
    private route: ActivatedRoute, // ✅ ADD THIS
  ) {
    console.log('CourseListComponent constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('CourseListComponent initialised');

    // Load courses from service
    this.courseService
      .getCourses()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          console.log('Courses loaded:', courses.length);
        },
        error: (error) => {
          this.errorMessage = error.message;
          console.error('Error loading courses:', error);
          this.isLoading = false;
        },
        complete: () => {
          console.log('Course loading complete');
          this.isLoading = false;
        },
      });

    const searchQuery = this.route.snapshot.queryParamMap.get('search');
    if (searchQuery) {
      console.log('Search query:', searchQuery);
      this.searchTerm = searchQuery;
      // In real app: filter courses by searchQuery
    }

    // Simulate loading (existing code)
    this.ngZone.runOutsideAngular(() => {
      this.loadingTimeoutId = setTimeout(() => {
        this.ngZone.run(() => {
          console.log('Loading complete');
          this.isLoading = false;
          this.cdr.detectChanges();
        });
      }, 1500);
    });
  }

  onEnroll(courseId: number): void {
    console.log(`Enrolling in course: ${courseId}`);
    this.selectedCourseId = courseId;

    const enrolledCourse = this.courses.find((c) => c.id === courseId);
    if (enrolledCourse) {
      console.log(`Successfully enrolled in: ${enrolledCourse.name}`);
    }
  }

  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  navigateToCourseDetail(courseId: number): void {
    const course = this.courses.find((currentCourse) => currentCourse.id === courseId);
    console.log('Navigating to course detail:', course?.name ?? courseId);
    this.router.navigate(['/courses', courseId]);
  }

  updateSearchUrl(): void {
    if (this.searchTerm) {
      console.log('Updating URL with search:', this.searchTerm);
      this.router.navigate(['/courses'], {
        queryParams: { search: this.searchTerm },
      });
    } else {
      this.router.navigate(['/courses']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.loadingTimeoutId) {
      clearTimeout(this.loadingTimeoutId);
    }
  }
}
