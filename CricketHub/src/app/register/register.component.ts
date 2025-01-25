import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class RegisterComponent {
  registerForm: FormGroup;
  isDarkMode = false; // Dark mode toggle

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Handle form submission
  onSubmit() {
    if (this.registerForm.valid) {
      this.toastr.success('Registration successful!', 'Welcome to CricketHub');
      this.router.navigate(['/login']);
    }
  }

  // Redirect to login page
  goToLogin() {
    this.router.navigate(['/login']);
  }

  // Toggle dark mode
  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const registerPage = document.querySelector('.register-page');
    if (registerPage) {
      if (this.isDarkMode) {
        registerPage.classList.add('dark-mode');
      } else {
        registerPage.classList.remove('dark-mode');
      }
    }
  }
}