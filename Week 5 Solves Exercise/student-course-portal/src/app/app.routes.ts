import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { StudentProfile } from './pages/student-profile/student-profile';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: Home,
  },

  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      {
        path: '',
        component: CourseList,
      },
      {
        path: ':id',
        component: CourseDetail,
      },
    ],
  },

  {
    path: 'profile',
    component: StudentProfile,
    canActivate: [authGuard],
  },

  {
    path: 'enroll',
    loadChildren: () =>
      import('./features/enrollment/enrollment-module').then((m) => m.EnrollmentModule),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];
