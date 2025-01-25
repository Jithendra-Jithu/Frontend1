import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PlayerDashboardComponent } from './player-dashboard/player-dashboard.component';
import { PlayerRegistrationComponent } from './player-registration/player-registration.component';
import { OrganizerDashboardComponent } from './organizer-dashboard/organizer-dashboard.component'; // Import OrganizerDashboardComponent
// import { StartMatchComponent } from './start-match/start-match.component'; // Import StartMatchComponent
import { MatchOverviewComponent } from './match-overview/match-overview.component'; // Import MatchOverviewComponent
import { CreateTournamentComponent } from './create-tournament/create-tournament.component';
import { MatchStatsComponent } from './match-stats/match-stats.component';
import { FansDashboardComponent } from './fans-dashboard/fans-dashboard.component';
import { TrainingComponent } from './training/training.component';
import { CricplayComponent } from './cricplay/cricplay.component';


export const routes: Routes = [
  { path: '', redirectTo: 'crickplay', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'player-dashboard', component: PlayerDashboardComponent },
  { path: 'player-registration', component: PlayerRegistrationComponent },
  { path: 'match-stats',component: MatchStatsComponent },

  // New routes for organizer dashboard and match components
  { path: 'organizer-dashboard', component: OrganizerDashboardComponent },
  // { path: 'start-match', component: StartMatchComponent },
  { path: 'match-overview', component: MatchOverviewComponent },
  { path: 'create-tournament', component: CreateTournamentComponent },
  { path: 'training', component: TrainingComponent },
  { path: 'crickplay', component:CricplayComponent },
  { path: 'fans-dashboard',component: FansDashboardComponent}
  
];
