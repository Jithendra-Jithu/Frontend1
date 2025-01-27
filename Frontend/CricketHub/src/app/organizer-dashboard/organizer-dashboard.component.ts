import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

type Match = {
  title: string;
  location: string;
  date: Date;
  status: string;
  image?: string; // Add image property
};

@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  styleUrls: ['./organizer-dashboard.component.css'],
  imports: [CommonModule, FormsModule, NavbarComponent],
})
export class OrganizerDashboardComponent implements OnInit {
  organizer = {
    name: 'Jashwanth',
    matchesOrganized: 0,
    sponsors: 2,
    supportStaff: 15,
  };

  matches: Match[] = [
    {
      title: 'Bharath Box Cricket',
      location: 'Shapur, Hyderabad',
      date: new Date('2024-01-21'),
      status: 'START',
    },
    {
      title: 'Srujana Cricket Ground',
      location: 'Kukatpally, Hyderabad',
      date: new Date('2024-01-20'),
      status: 'UPCOMING',
    },
    {
      title: 'Elite Cricket Club',
      location: 'Gachibowli, Hyderabad',
      date: new Date('2024-01-19'),
      status: 'ENDED',
    },
    {
      title: 'Legends Cricket Ground',
      location: 'Kondapur, Hyderabad',
      date: new Date('2024-01-25'),
      status: 'ENDED',
    },
    {
      title: 'Thunderstruck Arena',
      location: 'Banjara Hills, Hyderabad',
      date: new Date('2024-03-01'),
      status: 'UPCOMING',
    },
    {
      title: 'Stadium Elite',
      location: 'Jubilee Hills, Hyderabad',
      date: new Date('2024-03-15'),
      status: 'START',
    },
  ];

  images = [
    'assets/image/org1.png',
    'assets/image/org2.png',
    'assets/image/org3.png',
    'assets/image/org4.jpg',
    'assets/image/org5.png',
    'assets/image/org6.png',
    'assets/image/org7.png',
  ];

  constructor(private router: Router) {
    this.shuffleImages();
    this.assignImagesToCards();
  }

  ngOnInit(): void {
    // Fetch organizer details from the backend (mocked for now)
    // Implement a service call here in the future.
  }

  logout(): void {
    this.router.navigate(['/login']);
    alert('Confirm Log out!');
  }

  handleStatusClick(match: Match): void {
    if (match.status === 'START') {
      this.router.navigate(['/match-stats'], { queryParams: { matchTitle: match.title } });
    }
  }

  handleOverviewClick(match: Match): void {
    if (match.status !== 'ENDED') {
      alert('The match has not ended yet!');
    } else {
      this.router.navigate(['/match-overview'], { queryParams: { matchTitle: match.title } });
    }
  }

  // New Method for Redirecting to Create Tournament Page
  navigateToCreateTournament(): void {
    this.router.navigate(['/create-tournament']);
  }

  shuffleImages(): void {
    // Shuffle the images array to ensure randomness
    for (let i = this.images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
    }
  }

  assignImagesToCards(): void {
    let previousImage = '';
    this.matches.forEach((match, index) => {
      let selectedImage;
      do {
        selectedImage = this.images[index % this.images.length];
      } while (selectedImage === previousImage);
      match.image = selectedImage;
      previousImage = selectedImage;
    });
  }
}
