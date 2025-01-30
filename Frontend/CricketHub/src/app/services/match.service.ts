import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  endMatch(matchId: any) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8085/api/matches'; // Gateway URL for matches
  private apiUrl2 = 'http://localhost:8085/api/teams'; // Gateway URL for matches
  private matchesSubject = new BehaviorSubject<any[]>([]);
  matches$ = this.matchesSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAllMatches(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/allMatches`).pipe(
      tap(matches => {
        this.matchesSubject.next(matches);
        localStorage.setItem('matches', JSON.stringify(matches));
      })
    );
  }

  getMatchByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/code/${code}`);
  }

  getMatchesByLocation(location: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/location/${location}`);
  }

  // Get matches by status
  getMatchesByStatus(status: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/status/${status}`);
  }

  // Update player stats in a match
  startMatch(matchId: string): Observable<any> {
    console.log('Calling startMatch for matchId:', matchId); // Debug log
    return this.http.put(`${this.apiUrl}/startMatch/${matchId}`, {})
      .pipe(
        tap(response => console.log('Start match response:', response)), // Debug log
        catchError(error => {
          console.error('Error in startMatch:', error); // Debug log
          throw error;
        })
      );
  }

  matchStats(matchId: string): Observable<any> {
    return this.http.get(`${this.apiUrl2}/matchStats/${matchId}`);
  }

  updatePlayerStats(playerStats: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/update-stats`, playerStats);
  }


  // updateMatchStatus(matchId: string): Observable<any> {
  //   return this.http.put(`${this.apiUrl}/update-status/${matchId}`, {});
  // }



  updateMatchWinner(matchId: string, winner: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-winner/${matchId}`, { winner });
  }

  updateMatchInningsCompleted(matchId: string, inningsCompleted: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-innings-completed/${matchId}`, { inningsCompleted });
  }

  updateMatchEnded(matchId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/endMatch/${matchId}`, {});
  }

}
