import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseService } from '../../services/course';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  isLoading = true;
  courses: Course[] = [];

  selectedCourseId: number | null = null;

  constructor(private courseService: CourseService) {
    console.log('CourseListComponent constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('CourseListComponent initialised');

    this.courses = this.courseService.getCourses();
    console.log(`Loaded ${this.courses.length} courses from CourseService`);
    this.isLoading = false;
    console.log('Loading complete');
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
