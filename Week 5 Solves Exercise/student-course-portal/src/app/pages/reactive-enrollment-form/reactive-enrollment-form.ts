import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentFormComponent implements OnInit {
  enrollForm!: FormGroup;

  // ============ FORM STATE ============
  submitted = false;

  constructor(private fb: FormBuilder) {
    console.log('ReactiveEnrollmentFormComponent constructed');
  }

  ngOnInit(): void {
    console.log('ReactiveEnrollmentFormComponent initialized');
    this.initializeForm();
  }

  private initializeForm(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],

      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck.bind(this)], // Async validator
      ],

      courseId: ['', [Validators.required, this.noCourseCode.bind(this)]],

      // ============ PREFERRED SEMESTER CONTROL ============
      preferredSemester: ['Odd', [Validators.required]],

      agreeToTerms: [false, [Validators.requiredTrue]],

      additionalCourses: this.fb.array([], [Validators.required]),
    });

    console.log('Form initialized:', this.enrollForm);
  }

  noCourseCode(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null; // Empty value is OK (required validator handles it)
    }

    const courseCode = String(control.value).toUpperCase();

    if (courseCode.startsWith('XX')) {
      console.log(`❌ Custom validator: Course code "${courseCode}" starts with XX`);
      return { noCourseCode: true };
    }

    console.log(`✅ Custom validator: Course code "${courseCode}" is valid`);
    return null;
  }

  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      const email = control.value;

      // Simulate API call delay (800ms)
      setTimeout(() => {
        if (!email) {
          resolve(null); // Empty is OK (required validator handles it)
          return;
        }

        // Simulate backend check: emails with 'test@' are taken
        if (email.includes('test@')) {
          console.log(`❌ Async validator: Email "${email}" is already taken`);
          resolve({ emailTaken: true });
        } else {
          console.log(`✅ Async validator: Email "${email}" is available`);
          resolve(null);
        }
      }, 800);
    });
  }

  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    console.log('Adding new course control...');

    // Create a new form control with validators
    const newCourseControl = this.fb.control('', [
      Validators.required,
      this.noCourseCode.bind(this), // Apply custom validator
    ]);

    // Push it to the FormArray
    this.additionalCourses.push(newCourseControl);

    console.log(`Total courses: ${this.additionalCourses.length}`);
  }

  removeCourse(index: number): void {
    console.log(`Removing course at index ${index}`);
    this.additionalCourses.removeAt(index);
    console.log(`Total courses now: ${this.additionalCourses.length}`);
  }

  onSubmit(): void {
    console.log('\n========== FORM SUBMITTED ==========');

    if (this.enrollForm.valid) {
      console.log('✅ Form is VALID');
    } else {
      console.log('❌ Form is INVALID');
    }

    console.log('Form Value (enabled controls only):', this.enrollForm.value);
    console.log('Form Raw Value (all controls):', this.enrollForm.getRawValue());

    // Log individual field values
    console.log('Student Name:', this.enrollForm.get('studentName')?.value);
    console.log('Email:', this.enrollForm.get('studentEmail')?.value);
    console.log('Course ID:', this.enrollForm.get('courseId')?.value);
    console.log('Semester:', this.enrollForm.get('preferredSemester')?.value);
    console.log('Agree to Terms:', this.enrollForm.get('agreeToTerms')?.value);
    console.log('Additional Courses:', this.additionalCourses.value);

    if (this.enrollForm.valid) {
      this.submitted = true;
      console.log('✅ Enrollment request submitted successfully!');
    } else {
      console.log('❌ Form submission failed - please fix errors');
    }

    console.log('====================================\n');
  }

  onReset(): void {
    console.log('Resetting form...');
    this.enrollForm.reset({
      preferredSemester: 'Odd',
      additionalCourses: [],
    });
    this.submitted = false;
    console.log('Form reset complete');
  }
}
