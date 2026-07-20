import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  //Interpolation binding
  portalName = 'Student Course Portal';

  //Property binding
  isPortalActive = true;

  ///Event Binding
  message = '';

  //Two-way binding
  searchTerm = '';

  coursesAvailable = 0;
  coursesEnrolled = 3;
  gpa = 3.8;
  //Life Cycle Hooks
  constructor(private courseService: CourseService) {
    console.log('HomeComponent constructor - CourseService injected');
  }

  ngOnInit(): void {
    console.log('HomeComponent initialised');

    this.coursesAvailable = this.courseService.getCourseCount();
    console.log(`Home component loaded with ${this.coursesAvailable} available courses`);
  }

  // ngOnDestroy(): void {
  //   console.log('HomeComponent destroyed');
  // }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
    console.log('Enrollment button clicked');
  }
}
