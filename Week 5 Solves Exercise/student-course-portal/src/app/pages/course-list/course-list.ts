import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  courses: Course[] = [];
  searchTerm = '';

  selectedCourseId: number | null = null;

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
    this.courses = this.courseService.getCourses();
    console.log(`Loaded ${this.courses.length} courses from CourseService`);

    const searchQuery = this.route.snapshot.queryParamMap.get('search');
    if (searchQuery) {
      console.log('Search query:', searchQuery);
      this.searchTerm = searchQuery;
      // In real app: filter courses by searchQuery
    }

    // Simulate loading (existing code)
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
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
    console.log('Navigating to course detail:', courseId);
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
}
