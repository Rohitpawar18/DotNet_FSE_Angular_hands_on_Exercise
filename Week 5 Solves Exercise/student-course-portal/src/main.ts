import { bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app';
import { routes } from './app/app.routes';
import { authInterceptor } from './app/interceptors/auth.interceptor';
import { errorHandlerInterceptor } from './app/interceptors/error-handler.interceptor';
import { loadingInterceptor } from './app/interceptors/loading.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { courseReducer } from './app/store/course/course.reducer';
import { CourseEffects } from './app/store/course/course.effects';
import { isDevMode } from '@angular/core';

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withInterceptors([authInterceptor, errorHandlerInterceptor, loadingInterceptor]),
    ),

    // ✅ NGRX STORE SETUP
    /**
     * provideStore() registers the root store
     * { course: courseReducer } registers course feature slice
     */
    provideStore({
      course: courseReducer,
    }),

    // ✅ NGRX EFFECTS SETUP
    /**
     * provideEffects registers all effects
     * Effects handle async operations like HTTP calls
     */
    provideEffects([CourseEffects]),

    // ✅ REDUX DEVTOOLS SETUP
    /**
     * Enables Redux DevTools browser extension
     * maxAge: 25 keeps last 25 state snapshots
     * logOnly: true in production (disabled in dev)
     */
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),
  ],
});
