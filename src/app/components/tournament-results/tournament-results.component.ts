import { Component, input } from '@angular/core';
import { StatisticsCardComponent } from '../statistics-card/statistics-card.component';
import { PokemonTournamentStatistic } from '../../models/pokemon-tournament-statistic.model';

@Component({
  selector: 'app-tournament-results',
  standalone: true,
  imports: [StatisticsCardComponent],
  templateUrl: './tournament-results.component.html',
  styleUrl: './tournament-results.component.scss'
})
export class TournamentResultsComponent {
  statistics = input<PokemonTournamentStatistic[]>([]);
}
