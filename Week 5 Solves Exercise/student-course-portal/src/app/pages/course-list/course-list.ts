import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';

interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  gradeStatus: 'passed' | 'failed' | 'pending';
}

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  isLoading = true;
  courses: Course[] = [
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

  selectedCourseId: number | null = null;

  /**
   * ✅ Using ChangeDetectorRef instead of NgZone
   * This is the most direct way to trigger change detection
   */
  constructor(private cdr: ChangeDetectorRef) {
    console.log('CourseListComponent constructor called');
  }

  ngOnInit(): void {
    console.log('CourseListComponent initialised');
    console.log(`Loaded ${this.courses.length} courses`);

    /**
     * ✅ Simple setTimeout with manual change detection
     */
    setTimeout(() => {
      console.log('Loading complete - showing course list');
      this.isLoading = false;

      // ✅ Manually trigger change detection
      this.cdr.detectChanges();
      console.log('Change detection triggered - isLoading:', this.isLoading);
    }, 1500);
  }

  ngOnDestroy(): void {
    console.log('CourseListComponent destroyed');
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
}
