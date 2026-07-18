import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input() course!: {
    id: number;
    name: string;
    code: string;
    credits: number;
    gradeStatus?: string;
  };
  @Output() enrollRequested = new EventEmitter<number>();

  constructor() {
    console.log('CourseCardComponent constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CourseCardComponent ngOnChanges fired');

    if (changes['course']) {
      const courseChange = changes['course'];
      console.log('  Course Input Changed:');
      console.log('    Previous:', courseChange.previousValue);
      console.log('    Current:', courseChange.currentValue);
      console.log('    First Change?:', courseChange.firstChange);
    }
  }

  onEnrollClick(): void {
    if (this.course) {
      console.log(`Emitting enrollRequested event for course ID: ${this.course.id}`);
      // Emit the course ID to parent via @Output
      this.enrollRequested.emit(this.course.id);
    }
  }
}
