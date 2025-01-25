import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-fans-dashboard',
  templateUrl: './fans-dashboard.component.html',
  styleUrls: ['./fans-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
})
export class FansDashboardComponent {
  // Inject Router into the constructor
  constructor(private router: Router) {}

  // Updated method to navigate to /match-overview route
  goToOverview() {
    this.router.navigate(['/match-overview']);
  }

  matches = [
    { id: 1, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 2, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 3, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 4, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 1, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 2, type: 'upcoming', name: 'Srujana Cricket Ground', location: 'Kukatpally, Hyderabad', date: '2025-02-01' },
    { id: 3, type: 'completed', name: 'Green Park Stadium', location: 'Kanpur, UP', date: '2025-01-15' },
  ];

  activeTab: 'ongoing' | 'upcoming' | 'completed' = 'ongoing';

  // Map match types to images
  matchImages = {
    ongoing: 'assets/image/live.jpg',
    upcoming: 'assets/image/upcoming.avif',
    completed: 'assets/image/completed.jpg'
  };

  get filteredMatches() {
    return this.matches.filter((match) => match.type === this.activeTab);
  }

  calculateDaysLeft(date: string): number {
    const matchDate = new Date(date);
    const currentDate = new Date();
    return Math.ceil((matchDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  }
}
