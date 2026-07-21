import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Adds a mock authorization token to every outgoing HTTP request.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔐 Intercepting request for auth header:', req.method, req.url);

  const clonedReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345',
    },
  });

  return next(clonedReq);
};
