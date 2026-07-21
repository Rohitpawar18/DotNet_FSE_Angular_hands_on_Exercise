import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

export interface CourseState {
  courses: Course[];

  loading: boolean;

  error: string | null;
}

export const initialState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialState,

  on(CourseActions.loadCourses, (state) => ({
    ...state, // ✅ IMMUTABILITY: spread current state
    loading: true,
    error: null,
  })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses: courses, // ✅ New array from API
    loading: false,
    error: null,
  })),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error, // ✅ Error message from Effect
  })),

  on(CourseActions.createCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CourseActions.createCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course], // ✅ Immutable: new array with new course
    loading: false,
    error: null,
  })),

  on(CourseActions.createCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // ✅ DELETE COURSE HANDLERS
  on(CourseActions.deleteCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter((course) => course.id !== id), // ✅ Filter out deleted course
    loading: false,
    error: null,
  })),

  on(CourseActions.deleteCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  // ✅ UPDATE COURSE HANDLERS
  on(CourseActions.updateCourse, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(CourseActions.updateCourseSuccess, (state, { course }) => ({
    ...state,
    courses: state.courses.map((c) => (c.id === course.id ? course : c)), // ✅ Immutable update
    loading: false,
    error: null,
  })),

  on(CourseActions.updateCourseFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
);
