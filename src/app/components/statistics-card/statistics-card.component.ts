import { Component, computed, input } from '@angular/core';
import { PokemonTournamentStatistic } from '../../models/pokemon-tournament-statistic.model';

@Component({
  selector: 'app-statistics-card',
  standalone: true,
  imports: [],
  templateUrl: './statistics-card.component.html',
  styleUrl: './statistics-card.component.scss'
})
export class StatisticsCardComponent {
  statistics = input.required<PokemonTournamentStatistic>();

  imgUrl = computed(() =>
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.statistics().id}.png`
  );

  displayName = computed(() => {
    const name = this.statistics().name;
    return name.charAt(0).toUpperCase() + name.slice(1);
  });

  displayId = computed(() => `#${this.statistics().id.toString().padStart(3, '0')}`);

  totalMatches = computed(() => {
    const { wins, losses, ties } = this.statistics();
    return wins + losses + ties;
  });

  winRate = computed(() => {
    const total = this.totalMatches();
    return total === 0 ? 0 : Math.round((this.statistics().wins / total) * 100);
  });
}
