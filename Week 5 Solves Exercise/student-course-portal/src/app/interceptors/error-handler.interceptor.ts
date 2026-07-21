import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Converts HTTP failures into consistent application errors and handles navigation for auth failures.
 */
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = `Request failed with status ${error.status}`;

      if (error.status === 401) {
        errorMessage = 'Unauthorized request. Redirecting to home.';
        router.navigate(['/']);
      } else if (error.status === 403) {
        errorMessage = 'Access denied.';
      } else if (error.status === 404) {
        errorMessage = 'Resource not found.';
      } else if (error.status === 500) {
        errorMessage = 'Server error, please try again.';
      } else if (error.status > 0) {
        errorMessage = `HTTP ${error.status}: ${error.message || 'Unknown error'}`;
      } else {
        errorMessage = error.message || 'Network error, please check the server.';
      }

      console.error('❌ HTTP error intercepted:', {
        status: error.status,
        message: error.message,
        url: req.url,
      });

      return throwError(() => new Error(errorMessage));
    }),
  );
};
