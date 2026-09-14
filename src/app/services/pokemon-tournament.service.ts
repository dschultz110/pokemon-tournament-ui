import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { PokemonTournamentStatistic } from '../models/pokemon-tournament-statistic.model';
import { SortDirection, SortField } from '../models/sort.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonTournamentService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://localhost:7166/pokemon/tournament';

  getStatistics(sortBy?: SortField, sortDirection?: SortDirection): Observable<PokemonTournamentStatistic[]> {
    let params = new HttpParams();
    if (sortBy) {
      params = params.set('sortBy', sortBy);
    }
    if (sortDirection) {
      params = params.set('sortDirection', sortDirection);
    }

    return this.http.get<PokemonTournamentStatistic[]>(`${this.baseUrl}/statistics`, { params });
  }
}
