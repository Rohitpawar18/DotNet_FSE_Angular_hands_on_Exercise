import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { StudentProfile } from './pages/student-profile/student-profile';
import { EnrollmentForm } from './pages/enrollment-form/enrollment-form';
import { ReactiveEnrollmentFormComponent } from './pages/reactive-enrollment-form/reactive-enrollment-form';
import { CourseSummaryWidget } from './components/course-summary-widget/course-summary-widget';
import { NotificationComponent } from './components/notification/notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    Header,
    Home,
    CourseList,
    StudentProfile,
    EnrollmentForm,
    ReactiveEnrollmentFormComponent,
    CourseSummaryWidget,
    NotificationComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Student Course Portal';
}
