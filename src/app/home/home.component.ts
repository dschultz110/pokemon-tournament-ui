import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { catchError, of } from 'rxjs';

import { HeaderComponent } from '../components/header/header.component';
import { SortingComponent } from '../components/sorting/sorting.component';
import { TournamentResultsComponent } from '../components/tournament-results/tournament-results.component';
import { PokemonTournamentStatistic } from '../models/pokemon-tournament-statistic.model';
import { SortDirection, SortField } from '../models/sort.model';
import { PokemonTournamentService } from '../services/pokemon-tournament.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, SortingComponent, TournamentResultsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly pokemonTournamentService = inject(PokemonTournamentService);

  statistics = signal<PokemonTournamentStatistic[]>([]);
  sortField = signal<SortField>('wins');
  sortDirection = signal<SortDirection>('desc');

  sortedStatistics = computed(() => {
    const field = this.sortField();
    const multiplier = this.sortDirection() === 'asc' ? 1 : -1;

    return [...this.statistics()].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }

      return ((aValue as number) - (bValue as number)) * multiplier;
    });
  });

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.pokemonTournamentService
      .getStatistics(this.sortField(), this.sortDirection())
      .pipe(
        catchError((error) => {
          console.error('Failed to load tournament statistics', error);
          return of([]);
        })
      )
      .subscribe((statistics) => this.statistics.set(statistics));
  }
}
