import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-match-overview',
  templateUrl: './match-overview.component.html',
  styleUrls: ['./match-overview.component.css'],
  standalone: true,
  imports: [CommonModule,NavbarComponent],
})
export class MatchOverviewComponent {
  teamA = [
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0 },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1 },
  ];
  teamB = [
    { playerId: 1, name: 'Player B1', runs: 20, wickets: 2 },
    { playerId: 2, name: 'Player B2', runs: 40, wickets: 0 },
  ];
}
