import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { MatchService } from '../services/match.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-registeredplayers',
  standalone: true,
  imports: [CommonModule, NavbarComponent],
  templateUrl: './registeredplayers.component.html',
  styleUrls: ['./registeredplayers.component.css']
})
export class RegisteredplayersComponent implements OnInit {
  teamA: any = { team: {} };
  teamB: any = { team: {} };
  matchId: string = '';

  constructor(
    private matchService: MatchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.matchId = params['id'];
      this.loadRegisteredPlayers();
    });
  }

  loadRegisteredPlayers() {
    this.matchService.getRegisteredPlayers(this.matchId).subscribe(
      (teams: any[]) => {
        teams.forEach(team => {
          if (team.teamName === 'Team A') {
            this.teamA = team;
          } else if (team.teamName === 'Team B') {
            this.teamB = team;
          }
        });
      },
      error => {
        console.error('Error loading registered players:', error);
      }
    );
  }
}
