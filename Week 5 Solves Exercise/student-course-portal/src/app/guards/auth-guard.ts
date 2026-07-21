import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    console.log('✅ AuthGuard: User is logged in - allowing access');
    return true;
  }

  console.log('❌ AuthGuard: User not logged in - redirecting to home');
  router.navigate(['/']);
  return false;
};

import { inject } from '@angular/core';
