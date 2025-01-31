import { CommonModule } from '@angular/common'; 
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EditScoreDialogComponent } from '../edit-score-dialog/edit-score-dialog.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatchService } from '../services/match.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from '../services/player.service';


interface TeamScore {
  teamScore: number;
  teamWickets: number;
  teamOvers: number;
}

interface Player {
  playerId: number;
  name: string;
  runs: number;
  wickets: number;
  isBatting: boolean;
  isBowling: boolean;
}

interface Team {
  id: number;
  matchId: string;
  team: { [key: string]: number[] };
  teamSize: number;
  teamScore: number;
  teamWickets: number;
  teamName: string;
  userId: string;
  deliviries: number;
  teamOvers: number;
  scoreHistory: any[];
}

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
export class MatchStatsComponent implements OnInit {
  teamA: Team | null = null;
  teamB: Team | null = null;
  battingTeam: 'A' | 'B' = 'A';
  matchId: string = '';
  teamsSelected = false; // Tracks if teams have been selected
  inningsCompleted = false; // Tracks if the innings have been completed
  matchEnded = false; // Tracks if the match has ended
  winner = ''; // Stores the match winner
  matchStarted: boolean = false;
matchStatus: any="Ongoing";

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private matchService: MatchService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.matchId = this.route.snapshot.queryParams['matchId'];
    this.loadMatchStats();
  }

  loadMatchStats() {
    // Using the API Gateway URL
    this.http.get<Team[]>(`http://localhost:8085/api/teams/matchStats/${this.matchId}`).subscribe({
      next: (teams) => {
        teams.forEach(team => {
          if (team.teamName === 'Team A') {
            this.teamA = team;
          } else {
            this.teamB = team;
          }
        });
      },
      error: (error) => console.error('Error loading match stats:', error)
    });
  }

  openEditDialog(team: Team, playerId: string, fieldToEdit: 'runs' | 'wickets'): void {
    // Get the player's current stats from the team
    const playerStats = team.team[playerId] || [0, 0]; // [runs, wickets]
    
    const dialogRef = this.dialog.open(EditScoreDialogComponent, {
      width: '400px',
      data: {
        uid: playerId,
        teamId: team.teamName, // Using team name (A or B) instead of batting team
        name: `Player ${playerId}`,
        runs: playerStats[0],
        wickets: playerStats[1],
        fieldToEdit
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Update the player's stats in the team
        team.team[playerId] = [result.runs, result.wickets];
        
        // Update team totals if needed
        if (fieldToEdit === 'runs') {
          team.teamScore = result.runs;
        } else if (fieldToEdit === 'wickets') {
          team.teamWickets = result.wickets;
        }
        
        this.updateTeamScore(team.matchId, team.teamName);
      }
    });
  }

  updateTeamScore(matchId: string, teamName: string) {
    this.http.get<TeamScore>(`http://localhost:8085/api/teams/${matchId}/${teamName}/score`)
      .subscribe({
        next: (score) => {
          if (teamName === 'A' && this.teamA) {
            this.teamA.teamScore = score.teamScore;
            this.teamA.teamWickets = score.teamWickets;
            this.teamA.teamOvers = score.teamOvers;
          } else if (teamName === 'B' && this.teamB) {
            this.teamB.teamScore = score.teamScore;
            this.teamB.teamWickets = score.teamWickets;
            this.teamB.teamOvers = score.teamOvers;
          }
        },
        error: (error) => console.error('Error updating score:', error)
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

  // Start the match
  startMatch(): void {
    this.matchService.startMatch(Number(this.matchId)).subscribe({
      next: () => {
        this.matchStarted = true;
        this.matchStatus="Ongoing";
        this.router.navigate(['/match-stats'], { queryParams: { matchId: this.matchId } });
      },
      error: (error) => console.error('Error starting match:', error)
    });
  }

  // End the match
  endMatch(): void {
    this.matchService.endMatch(Number(this.matchId)).subscribe({
      next: () => {
        this.matchEnded = true;
        this.matchStatus="Completed";
        this.calculateWinner();
        this.router.navigate(['/organizer-dashboard']);
      },
      error: (error: any) => console.error('Error ending match:', error)
    });
  }

  // Calculate the winner based on scores
  calculateWinner(): void {
    const teamAScore = this.teamA?.teamScore || 0;
    const teamBScore = this.teamB?.teamScore || 0;

    if (teamAScore > teamBScore) {
      this.winner = 'Team A wins!';
    } else if (teamBScore > teamAScore) {
      this.winner = 'Team B wins!';
    } else {
      this.winner = 'It\'s a tie!';
    }
  }

  getPlayerName(playerId: string): string {
    // Call your player service to fetch the player name
    let playerName = 'Unknown Player';
    this.playerService.getPlayerById(playerId).subscribe(
      (player) => {
        playerName = player.userName; // Assuming the player object has a 'name' property
      },
      (error) => {
        console.error('Error fetching player name:', error);
      }
    );
    return playerName;
  }
}


