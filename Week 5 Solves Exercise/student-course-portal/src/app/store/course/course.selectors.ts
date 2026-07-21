import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';
import { Course } from '../../models/course.model';

export const selectCourseState = createFeatureSelector<CourseState>('course');

export const selectAllCourses = createSelector(
  selectCourseState,
  (state: CourseState) => state.courses,
);

export const selectCoursesLoading = createSelector(
  selectCourseState,
  (state: CourseState) => state.loading,
);

export const selectCoursesError = createSelector(
  selectCourseState,
  (state: CourseState) => state.error,
);

export const selectCourseById = (id: number) =>
  createSelector(selectAllCourses, (courses: Course[]) =>
    courses.find((course) => course.id === id),
  );

export const selectCourseCount = createSelector(
  selectAllCourses,
  (courses: Course[]) => courses.length,
);

export const selectPassedCourses = createSelector(selectAllCourses, (courses: Course[]) =>
  courses.filter((c) => c.gradeStatus === 'passed'),
);

export const selectFailedCourses = createSelector(selectAllCourses, (courses: Course[]) =>
  courses.filter((c) => c.gradeStatus === 'failed'),
);

export const selectPendingCourses = createSelector(selectAllCourses, (courses: Course[]) =>
  courses.filter((c) => c.gradeStatus === 'pending'),
);
