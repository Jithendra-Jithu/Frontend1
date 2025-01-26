import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EditScoreDialogComponent } from '../edit-score-dialog/edit-score-dialog.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-match-stats',
  templateUrl: './match-stats.component.html',
  styleUrls: ['./match-stats.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    NavbarComponent,
  ],
})
export class MatchStatsComponent {
  teamA = [
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0, isBatting: true, isBowling: false },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1, isBatting: true, isBowling: false },
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0, isBatting: false, isBowling: false },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1, isBatting: false, isBowling: false },
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0, isBatting: false, isBowling: false },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1, isBatting: false, isBowling: false },
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0, isBatting: false, isBowling: false },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1, isBatting: false, isBowling: false},
    { playerId: 1, name: 'Player A1', runs: 30, wickets: 0, isBatting: false, isBowling: false },
    { playerId: 2, name: 'Player A2', runs: 50, wickets: 1, isBatting: false, isBowling: false },
  ];
  teamB = [
    { playerId: 1, name: 'Player B1', runs: 20, wickets: 2, isBatting: false, isBowling: true },
    { playerId: 2, name: 'Player B2', runs: 40, wickets: 0, isBatting: false, isBowling: true },
  ];
  battingTeam: 'A' | 'B' = 'A'; // Tracks which team is batting
  teamsSelected = false; // Tracks if teams have been selected
  inningsCompleted = false; // Tracks if the innings have been completed
  matchEnded = false; // Tracks if the match has ended
  winner = ''; // Stores the match winner
 

  constructor(private dialog: MatDialog,private router: Router) {}

  openEditDialog(player: any, fieldToEdit: 'runs' | 'wickets'): void {
    const dialogRef = this.dialog.open(EditScoreDialogComponent, {
      data: {
        name: player.name,
        runs: player.runs,
        wickets: player.wickets,
        fieldToEdit,
      },
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (fieldToEdit === 'runs') {
          player.runs += result.runs;  // Add the new runs to the current runs
        } else if (fieldToEdit === 'wickets') {
          player.wickets += result.wickets;  // Add the new wickets to the current wickets
        }
      }
    });
  }

  // Select teams to start the match
  selectTeams(): void {
    this.battingTeam = this.battingTeam === 'A' ? 'B' : 'A';
    this.teamsSelected = true;
  }

  // Switch innings (batting and bowling)
  switchInnings(): void {
    if (!this.inningsCompleted) {
      this.battingTeam = this.battingTeam === 'A' ? 'B' : 'A';
      this.inningsCompleted = true;
    }
  }

  // End the match
  endMatch(): void {
    this.matchEnded = true;
    this.calculateWinner();
    this.router.navigate(['/organizer-dashboard']);
  }

  // Calculate the winner based on scores
  calculateWinner(): void {
    const teamAScore = this.teamA.reduce((total, player) => total + player.runs, 0);
    const teamBScore = this.teamB.reduce((total, player) => total + player.runs, 0);

    if (teamAScore > teamBScore) {
      this.winner = 'Team A wins!';
    } else if (teamBScore > teamAScore) {
      this.winner = 'Team B wins!';
    } else {
      this.winner = 'It\'s a tie!';
    }
  }
}
