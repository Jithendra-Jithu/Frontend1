import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-organizer-dashboard',
  templateUrl: './organizer-dashboard.component.html',
  imports: [CommonModule, FormsModule,NavbarComponent],
  styleUrls: ['./organizer-dashboard.component.css']
})
export class OrganizerDashboardComponent implements OnInit {
  organizer = {
    name: 'Jashwanth',
    matchesOrganized: 0,
    sponsors: 2,
    supportStaff: 15
  };

  matches = [
    {
      title: 'Bharath Box Cricket',
      location: 'Shapur, Hyderabad',
      date: new Date('2024-01-21'),
      status: 'START',
      imageUrl: 'assets/image/match1.jpg'
    },
    {
      title: 'Srujana Cricket Ground',
      location: 'Kukatpally, Hyderabad',
      date: new Date('2024-01-20'),
      status: 'UPCOMING',
      imageUrl: 'assets/image/match2.jpg'
    },
    {
      title: 'Elite Cricket Club',
      location: 'Gachibowli, Hyderabad',
      date: new Date('2024-01-19'),
      status: 'ENDED',
      imageUrl: 'assets/image/match3.jpg'
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Fetch organizer details from the backend (mocked for now)
    // Implement a service call here in the future.
  }

  logout(): void {
    
    this.router.navigate(['/login']);
    alert('Confirm Log out!');
  }

  handleStatusClick(match: any): void {
    if (match.status === 'START') {
      this.router.navigate(['/match-stats'], { queryParams: { matchTitle: match.title } });
    }
  }

  handleOverviewClick(match: any): void {
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
}
