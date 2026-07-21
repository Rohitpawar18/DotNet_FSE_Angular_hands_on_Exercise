import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

export const loadCourses = createAction('[Course] Load Courses');

export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>(), // ✅ Payload: array of courses from API
);

export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>(), // ✅ Payload: error message
);

export const loadCourse = createAction(
  '[Course] Load Course',
  props<{ id: number }>(), // ✅ Payload: course ID to load
);

export const loadCourseSuccess = createAction(
  '[Course] Load Course Success',
  props<{ course: Course }>(),
);

export const loadCourseFailure = createAction(
  '[Course] Load Course Failure',
  props<{ error: string }>(),
);

export const createCourse = createAction(
  '[Course] Create Course',
  props<{ course: Omit<Course, 'id'> }>(),
);

export const createCourseSuccess = createAction(
  '[Course] Create Course Success',
  props<{ course: Course }>(),
);

export const createCourseFailure = createAction(
  '[Course] Create Course Failure',
  props<{ error: string }>(),
);

export const deleteCourse = createAction('[Course] Delete Course', props<{ id: number }>());

export const deleteCourseSuccess = createAction(
  '[Course] Delete Course Success',
  props<{ id: number }>(),
);

export const deleteCourseFailure = createAction(
  '[Course] Delete Course Failure',
  props<{ error: string }>(),
);

export const updateCourse = createAction(
  '[Course] Update Course',
  props<{ id: number; course: Partial<Course> }>(),
);

export const updateCourseSuccess = createAction(
  '[Course] Update Course Success',
  props<{ course: Course }>(),
);

export const updateCourseFailure = createAction(
  '[Course] Update Course Failure',
  props<{ error: string }>(),
);
