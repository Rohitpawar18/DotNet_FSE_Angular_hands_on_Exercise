import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import {
  selectAllCourses,
  selectCoursesError,
  selectCoursesLoading,
} from '../../store/course/course.selectors';
import { loadCourse, loadCourses } from '../../store/course/course.actions';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  courses$ = this.store.select(selectAllCourses);
  // isLoading = true;
  isLoading$ = this.store.select(selectCoursesLoading);
  courses: Course[] = [];
  searchTerm = '';
  errorMessage = '';
  error$ = this.store.select(selectCoursesError);
  selectedCourseId: number | null = null;
  private destroy$ = new Subject<void>();
  private loadingTimeoutId?: ReturnType<typeof setTimeout>;

  // ✅ CHANGE THIS SECTION
  constructor(
    private courseService: CourseService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    console.log('CourseListComponent constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('CourseListComponent initialised');

    // ✅ DISPATCH LOAD ACTION
    /**
     * Trigger the course loading effect
     * This dispatches loadCourses action → Effect → HTTP call → Reducer updates state
     */
    this.store.dispatch(loadCourses());
    console.log('🔄 Dispatched loadCourses action');

    // ✅ READ QUERY PARAMETER (keep this)
    const searchQuery = this.route.snapshot.queryParamMap.get('search');
    if (searchQuery) {
      console.log('Search query:', searchQuery);
      this.searchTerm = searchQuery;
    }

    // ✅ REMOVE OLD LOADING LOGIC
    // (The store now manages loading state via selector)
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
