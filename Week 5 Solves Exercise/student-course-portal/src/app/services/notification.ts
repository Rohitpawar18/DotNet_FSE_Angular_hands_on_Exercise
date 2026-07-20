import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Notification {
  private notifications: string[] = [];

  constructor() {
    console.log('✅ NotificationService created (component-level instance)');
  }

  addNotification(message: string): void {
    this.notifications.push(message);
    console.log('📢 Notification added:', message);
  }

  getNotifications(): string[] {
    return [...this.notifications];
  }

  clearNotifications(): void {
    this.notifications = [];
    console.log('✓ Notifications cleared');
  }
}
