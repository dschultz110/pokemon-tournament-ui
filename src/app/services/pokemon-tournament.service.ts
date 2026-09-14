import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PokemonTournamentStatistic } from '../models/pokemon-tournament-statistic.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonTournamentService {
  private readonly baseUrl = 'https://localhost:7166/pokemon/tournament';

  constructor(private readonly http: HttpClient) {}

  getStatistics(): Observable<PokemonTournamentStatistic[]> {
    return this.http.get<PokemonTournamentStatistic[]>(`${this.baseUrl}/statistics`);
  }
}
