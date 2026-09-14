import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PokemonTournamentStatistic } from '../models/pokemon-tournament-statistic.model';
import { SortDirection, SortField } from '../models/sort.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonTournamentService {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.apiUrl}/pokemon/tournament`;

  getStatistics(sortBy: SortField, sortDirection: SortDirection): Observable<PokemonTournamentStatistic[]> {
    const params = new HttpParams().set('sortBy', sortBy).set('sortDirection', sortDirection);

    return this.http.get<PokemonTournamentStatistic[]>(`${this.baseUrl}/statistics`, { params });
  }
}
