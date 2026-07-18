import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  //Interpolation binding
  portalName = 'Student Course Portal';

  //Property binding
  isPortalActive = true;

  ///Event Binding
  message = '';

  //Two-way binding
  searchTerm = '';

  //Life Cycle Hooks
  constructor() {
    console.log('HomeComponent constructor called');
  }

  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');

    const availableCourses = 12;
    console.log(`Available courses : ${availableCourses}`);
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  //Event Handler

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
    console.log('Enrollment button clicked');
  }
}
