import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { Enrollment } from '../../services/enrollment';

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
  constructor(private enrollment: Enrollment) {
    console.log('CourseCardComponent constructor - EnrollmentService injected');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('CourseCardComponent ngOnChanges fired');
    if (changes['course']) {
      const courseChange = changes['course'];
      console.log('  Course Input Changed:', courseChange.currentValue);
    }
  }

  onEnrollClick(): void {
    if (this.course) {
      if (this.isEnrolled()) {
        // Already enrolled - unenroll
        console.log(`Unenrolling from course ${this.course.id}`);
        this.enrollment.unenroll(this.course.id);
      } else {
        // Not enrolled - enroll
        console.log(`Enrolling in course ${this.course.id}`);
        this.enrollment.enroll(this.course.id);
      }

      this.enrollRequested.emit(this.course.id);
    }
  }

  isEnrolled(): boolean {
    if (!this.course) return false;
    return this.enrollment.isEnrolled(this.course.id);
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
