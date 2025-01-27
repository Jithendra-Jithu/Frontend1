import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

type Match = {
  groundName: string;
  location: string;
  date: Date;
  id: number;
  code: string;
  image?: string; // Add image property
};

@Component({
  selector: 'app-player-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    NavbarComponent,
  ],
  templateUrl: './player-dashboard.component.html',
  styleUrls: ['./player-dashboard.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
  ],
})
export class PlayerDashboardComponent {
  searchCode: string = '';
  isBatting: boolean = true;
  playerData = {
    playerName: 'Jashwanth',
    totalMatches: 50,
    highestRuns: 120,
    totalRuns: 4000,
    highestWickets: 6,
    totalWickets: 250,
  };

  matches: Match[] = [
    {
      groundName: 'Eden Gardens',
      location: 'Kolkata',
      date: new Date('2025-01-25'),
      id: 1,
      code: 'M01',
    },
    {
      groundName: 'Wankhede Stadium',
      location: 'Mumbai',
      date: new Date('2025-02-10'),
      id: 2,
      code: 'M02',
    },
    {
      groundName: 'Chinnaswamy Stadium',
      location: 'Bangalore',
      date: new Date('2025-03-15'),
      id: 3,
      code: 'M03',
    },
    {
      groundName: 'MA Chidambaram Stadium',
      location: 'Chennai',
      date: new Date('2025-04-05'),
      id: 4,
      code: 'M04',
    },
    {
      groundName: 'Feroz Shah Kotla Ground',
      location: 'Delhi',
      date: new Date('2025-05-20'),
      id: 5,
      code: 'M05',
    },
  ];

  images = [
    'assets/image/player1.avif',
    'assets/image/player5.avif',
    'assets/image/player3.jpg',
    'assets/image/player4.jpg',
    'assets/image/player2.jpg',
  ];

  constructor(private router: Router) {
    this.shuffleImages();
    this.assignImagesToCards();
  }

  getDisplayedColumns(): string[] {
    return this.isBatting
      ? ['name', 'matchesPlayed', 'highScore', 'totalRuns']
      : ['name', 'matchesPlayed', 'highestWickets', 'totalWickets'];
  }

  onStatisticsChange(event: any): void {
    this.isBatting = event.value === 'batting';
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  trackLocation(location: string): void {
    console.log('Tracking location:', location);
  }

  playerregistration(): void {
    this.router.navigate(['/player-registration']);
  }

  searchMatch(): void {
    if (this.searchCode) {
      const match = this.matches.find((m) => m.code === this.searchCode);
      if (match) {
        console.log('Found match:', match);
      } else {
        console.log('Match not found');
      }
    } else {
      console.log('Please enter a match code');
    }
  }

  shuffleImages(): void {
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
