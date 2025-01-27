import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { NavbarComponent } from '../navbar/navbar.component';

// Define the interface for match objects
interface Match {
  id: number;
  type: 'ongoing' | 'upcoming' | 'completed'; // Enforce match types
  name: string;
  location: string;
  date: string;
  image?: string; // Add image property (optional)
}

@Component({
  selector: 'app-fans-dashboard',
  templateUrl: './fans-dashboard.component.html',
  styleUrls: ['./fans-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, NavbarComponent],
})
export class FansDashboardComponent {
  constructor(private router: Router) {
    this.assignRandomImages();
  }

  // Matches data with type annotations
  matches: Match[] = [
    { id: 1, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 2, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 3, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 4, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 5, type: 'ongoing', name: 'Bharath Box Cricket', location: 'Shapur, Hyderabad', date: '2025-01-23' },
    { id: 6, type: 'upcoming', name: 'Srujana Cricket Ground', location: 'Kukatpally, Hyderabad', date: '2025-02-01' },
    { id: 6, type: 'upcoming', name: 'Srujana Cricket Ground', location: 'Kukatpally, Hyderabad', date: '2025-02-06' },
    { id: 6, type: 'upcoming', name: 'Srujana Cricket Ground', location: 'Kukatpally, Hyderabad', date: '2025-02-08' },
    { id: 7, type: 'completed', name: 'Green Park Stadium', location: 'Kanpur, UP', date: '2025-01-15' },
    { id: 7, type: 'completed', name: 'Green Park Stadium', location: 'Kanpur, UP', date: '2025-01-15' },
    { id: 7, type: 'completed', name: 'Green Park Stadium', location: 'Kanpur, UP', date: '2025-01-15' },
    { id: 7, type: 'completed', name: 'Green Park Stadium', location: 'Kanpur, UP', date: '2025-01-15' },
  ];

  // Active tab to filter matches
  activeTab: 'ongoing' | 'upcoming' | 'completed' = 'ongoing';

  // Map match types to multiple images
  matchImages = {
    ongoing: ['assets/image/live1.jpg', 'assets/image/live2.jpg', 'assets/image/live3.avif', 'assets/image/live4.avif', 'assets/image/live5.jpg'],
    upcoming: ['assets/image/upc1.webp', 'assets/image/upc2.webp', 'assets/image/upc3.webp', 'assets/image/upc4.webp'],
    completed: ['assets/image/comp1.webp', 'assets/image/comp2.webp', 'assets/image/comp3.webp', 'assets/image/comp4.webp']
  };

  // Get filtered matches based on active tab
  get filteredMatches() {
    return this.matches.filter((match) => match.type === this.activeTab);
  }

  // Assign random images from the available set and ensure no two consecutive images are the same
  assignRandomImages() {
    this.filteredMatches.forEach((match, index) => {
      let randomIndex: number;
      do {
        randomIndex = Math.floor(Math.random() * this.matchImages[this.activeTab].length);
      } while (index > 0 && this.matchImages[this.activeTab][randomIndex] === this.matchImages[this.activeTab][index - 1]);
      match.image = this.matchImages[this.activeTab][randomIndex]; // Assign image
    });
  }

  // Calculate the days left for upcoming matches
  calculateDaysLeft(date: string): number {
    const matchDate = new Date(date);
    const currentDate = new Date();
    return Math.ceil((matchDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  }

  // Navigate to match overview
  goToOverview() {
    this.router.navigate(['/match-overview']);
  }
}
