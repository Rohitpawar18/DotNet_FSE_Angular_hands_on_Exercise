import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, retry } from 'rxjs/operators';
import { CourseService } from '../../services/course';
import * as CourseActions from './course.actions';

@Injectable()
export class CourseEffects {
  /**
   * DEPENDENCY INJECTION
   *
   * Actions$: Observable of all dispatched actions
   * courseService: HTTP service for API calls
   */
  constructor(
    private actions$: Actions,
    private courseService: CourseService,
  ) {
    console.log('✅ CourseEffects created');
  }

  /**
   * LOAD COURSES EFFECT
   *
   * Flow:
   * 1. Component dispatches loadCourses()
   * 2. ofType(loadCourses) filters to this action
   * 3. switchMap calls courseService.getCourses()
   * 4. Success: map to loadCoursesSuccess({ courses })
   * 5. Failure: catchError returns loadCoursesFailure({ error })
   * 6. Reducer handles success/failure action
   */
  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      // ✅ Listen for loadCourses action
      ofType(CourseActions.loadCourses),

      // ✅ Log the action
      tap(() => console.log('[Effect] loadCourses$ triggered')),

      // ✅ switchMap: Call HTTP, cancel previous if new action arrives
      switchMap(() =>
        this.courseService.getCourses().pipe(
          // ✅ Retry 2 times on failure
          retry(2),

          // ✅ Transform response to success action
          map((courses) => {
            console.log('[Effect] loadCourses HTTP success:', courses.length);
            return CourseActions.loadCoursesSuccess({ courses });
          }),

          // ✅ Handle error → failure action
          catchError((error) => {
            console.error('[Effect] loadCourses HTTP error:', error.message);
            return of(
              CourseActions.loadCoursesFailure({
                error: error.message || 'Failed to load courses',
              }),
            );
          }),
        ),
      ),
    ),
  );

  /**
   * LOAD SINGLE COURSE EFFECT
   *
   * Similar flow but for loading single course by ID
   */
  loadCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourse),
      tap(({ id }) => console.log('[Effect] loadCourse$ triggered for ID:', id)),
      switchMap(({ id }) =>
        this.courseService.getCourseById(id).pipe(
          retry(2),
          map((course) => {
            if (!course) {
              throw new Error('Course not found');
            }
            console.log('[Effect] Course loaded:', course.name);
            return CourseActions.loadCourseSuccess({ course });
          }),
          catchError((error) =>
            of(
              CourseActions.loadCourseFailure({
                error: error.message || 'Failed to load course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /**
   * CREATE COURSE EFFECT
   *
   * Handles POST request to create new course
   * On success: dispatch success action (adds to state)
   * On failure: dispatch failure action (stores error)
   */
  createCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.createCourse),
      tap(({ course }) => console.log('[Effect] createCourse$ triggered:', course.name)),
      switchMap(({ course }) =>
        this.courseService.addCourse(course).pipe(
          map((newCourse) => {
            console.log('[Effect] Course created:', newCourse.id);
            return CourseActions.createCourseSuccess({ course: newCourse });
          }),
          catchError((error) =>
            of(
              CourseActions.createCourseFailure({
                error: error.message || 'Failed to create course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /**
   * DELETE COURSE EFFECT
   *
   * Handles DELETE request
   * Success: dispatch success action with ID (removes from state)
   */
  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      tap(({ id }) => console.log('[Effect] deleteCourse$ triggered for ID:', id)),
      switchMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => {
            console.log('[Effect] Course deleted:', id);
            return CourseActions.deleteCourseSuccess({ id });
          }),
          catchError((error) =>
            of(
              CourseActions.deleteCourseFailure({
                error: error.message || 'Failed to delete course',
              }),
            ),
          ),
        ),
      ),
    ),
  );

  /**
   * UPDATE COURSE EFFECT
   *
   * Handles PUT request
   */
  updateCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.updateCourse),
      tap(({ id }) => console.log('[Effect] updateCourse$ triggered for ID:', id)),
      switchMap(({ id, course }) =>
        this.courseService.updateCourse(id, course).pipe(
          map((updatedCourse) => {
            console.log('[Effect] Course updated:', id);
            return CourseActions.updateCourseSuccess({ course: updatedCourse });
          }),
          catchError((error) =>
            of(
              CourseActions.updateCourseFailure({
                error: error.message || 'Failed to update course',
              }),
            ),
          ),
        ),
      ),
    ),
  );
}
