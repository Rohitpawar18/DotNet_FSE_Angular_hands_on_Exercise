import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];

  constructor(private notification: Notification) {
    console.log(
      'NotificationComponent constructor - NotificationService injected (component-level)',
    );
  }

  ngOnInit(): void {
    console.log('NotificationComponent initialised');
  }

  addNotification(message: string): void {
    this.notification.addNotification(message);
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.notifications = this.notification.getNotifications();
  }

  clearAll(): void {
    this.notification.clearNotifications();
    this.notifications = [];
  }
}
