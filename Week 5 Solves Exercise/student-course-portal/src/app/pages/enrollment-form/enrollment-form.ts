import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  submitted = false;

  constructor() {
    console.log('EnrollmentFormComponent constructed');
  }

  onSubmit(form: NgForm): void {
    console.log('========== FORM SUBMITTED ==========');

    if (form.valid) {
      console.log('✅ Form is VALID');
    } else {
      console.log('❌ Form is INVALID');
    }

    console.log('Form Value:', form.value);

    console.log('Form Valid:', form.valid);
    if (form.valid) {
      console.log('✅ Processing enrollment request...');
      console.log('Student Name :', this.studentName);
      console.log('Email : ', this.studentEmail);
      console.log('Course ID : ', this.courseId);
      console.log('Preffered Semester : ', this.preferredSemester);
      console.log('Agreed To Terms : ', this.agreeToTerms);

      this.submitted = true;

      console.log('✅ Enrollment request submitted successfully!');
    } else {
      console.log('❌ Form submission failed - please fix errors');
    }
    console.log('====================================\n');
  }

  onReset(form: NgForm): void {
    console.log('Resseting Form...');

    this.studentName = '';
    this.studentEmail = '';
    this.courseId = null;
    this.preferredSemester = 'Odd';
    this.agreeToTerms = false;

    this.submitted = false;
    form.resetForm();
    console.log('Form reset complete');
  }
}
