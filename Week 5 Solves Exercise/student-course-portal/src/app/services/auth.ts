import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  isLoggedIn = true;

  constructor() {
    console.log('AuthService created');
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  login(): void {
    this.isLoggedIn = true;
    console.log('✅ Logged in');
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log('❌ Logged out');
  }
}
