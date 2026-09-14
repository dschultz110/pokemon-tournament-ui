import { Component, computed, input } from '@angular/core';
import { PokemonTournamentStatistic } from '../../models/pokemon-tournament-statistic.model';

const TYPE_COLORS: Record<string, string | undefined> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

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

  typeColor = computed(() => TYPE_COLORS[this.statistics().type.toLowerCase()] ?? '#68A090');

  totalMatches = computed(() => {
    const { wins, losses, ties } = this.statistics();
    return wins + losses + ties;
  });

  winRate = computed(() => {
    const total = this.totalMatches();
    return total === 0 ? 0 : Math.round((this.statistics().wins / total) * 100);
  });
}
