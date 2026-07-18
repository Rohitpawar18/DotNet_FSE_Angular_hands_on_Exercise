import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, Highlight, CreditLabelPipe],
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

  isExpanded = false;
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

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
    console.log(`Card ${this.course.id} extended: ${this.isExpanded}`);
  }

  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled(),
      'card--full': this.course?.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  isEnrolled(): boolean {
    // Placeholder: in real app, check against enrollment service
    return false;
  }

  get statusColor(): string {
    switch (this.course?.gradeStatus) {
      case 'passed':
        return '#28a745'; // Green
      case 'failed':
        return '#dc3545'; // Red
      case 'pending':
        return '#6c757d'; // Grey
      default:
        return '#e0e0e0'; // Light grey default
    }
  }
}
