import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTournamentStatistic } from '../../models/pokemon-tournament-statistic.model';
import { StatisticsCardComponent } from './statistics-card.component';

describe('StatisticsCardComponent', () => {
  let component: StatisticsCardComponent;
  let fixture: ComponentFixture<StatisticsCardComponent>;

  const mockStatistic: PokemonTournamentStatistic = {
    id: 1,
    name: 'bulbasaur',
    type: 'grass',
    wins: 6,
    losses: 6,
    ties: 4
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisticsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('statistics', mockStatistic);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
