import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-player-registration',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent],
  templateUrl: './player-registration.component.html',
  styleUrls: ['./player-registration.component.css'],
})
export class PlayerRegistrationComponent {
  name = '';
  email = '';
  mobile = '';
  team = '';
  positions = {
    batsman: false,
    bowler: false,
    allrounder: false,
  };

  nameError = '';
  emailError = '';
  mobileError = '';
  teamError = '';

  constructor(private router: Router) {}

  validateForm(): boolean {
    let valid = true;

    // Name validation
    if (!this.name.trim()) {
      this.nameError = 'Name is required.';
      valid = false;
    } else {
      this.nameError = '';
    }

    // Email validation
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|in)$/;
    if (!this.email.match(emailPattern)) {
      this.emailError = 'Enter a valid email (e.g., user@gmail.com).';
      valid = false;
    } else {
      this.emailError = '';
    }

    // Mobile number validation
    const mobilePattern = /^\d{10}$/;
    if (!this.mobile.match(mobilePattern)) {
      this.mobileError = 'Mobile number must be exactly 10 digits.';
      valid = false;
    } else {
      this.mobileError = '';
    }

    // Team selection validation
    if (!this.team) {
      this.teamError = 'Please select a team.';
      valid = false;
    } else {
      this.teamError = '';
    }

    return valid;
  }

  register() {
    if (this.validateForm()) {
      this.matchService.registerUser(this.team).subscribe( 
        (response: any) => {
          alert('Registration Successful!');
          this.router.navigate(['/player-dashboard']);
        },
        (error: any) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
