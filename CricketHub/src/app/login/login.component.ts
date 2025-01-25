import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('slideInFromLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('slideInFromRight', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  isDarkMode = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.error('Please fill in all fields correctly.', 'Error', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        easing: 'ease-in',
        easeTime: 300
      });
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.toastr.success('Login successful!', 'Welcome', {
        positionClass: 'toast-top-center',
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        easing: 'ease-in',
        easeTime: 300
      });
      this.router.navigate(['/home']);
    }, 2000);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const loginPage = document.querySelector('.login-page');
    if (loginPage) {
      if (this.isDarkMode) {
        loginPage.classList.add('dark-mode');
      } else {
        loginPage.classList.remove('dark-mode');
      }
    }
  }

  loginWithGoogle() {
    this.toastr.info('Logging in with Google...', 'Info', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 300
    });
  }

  loginWithFacebook() {
    this.toastr.info('Logging in with Facebook...', 'Info', {
      positionClass: 'toast-top-center',
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
      easing: 'ease-in',
      easeTime: 300
    });
  }
}
