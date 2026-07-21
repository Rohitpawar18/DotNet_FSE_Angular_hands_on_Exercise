import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * Toggles the global loading state around each HTTP request.
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  console.log('⏳ HTTP request started:', req.method, req.url);
  loadingService.setLoading(true);

  return next(req).pipe(
    finalize(() => {
      console.log('✅ HTTP request finished:', req.method, req.url);
      loadingService.setLoading(false);
    }),
  );
};
