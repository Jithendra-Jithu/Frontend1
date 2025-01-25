import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-create-tournament',
  standalone: true,
  templateUrl: './create-tournament.component.html',
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent],  // <-- Include ReactiveFormsModule here
  styleUrls: ['./create-tournament.component.css']
})
export class CreateTournamentComponent {
  tournamentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.tournamentForm = this.fb.group({
      groundName: ['', Validators.required],
      location: ['', Validators.required],
      teamSize: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      sponsors: ['', [Validators.required, Validators.min(1)]],
      supportStaff: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.tournamentForm.valid) {
      // After form submission, redirect to organizer dashboard
      this.router.navigate(['/organizer-dashboard']);
    } else {
      alert('Please fill out all fields correctly!');
    }
  }

  logout() {
    // Log out functionality
    console.log('Logging out');
    // Add actual logout functionality here (e.g., clear tokens, etc.)
  }
}
