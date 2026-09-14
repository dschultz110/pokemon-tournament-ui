import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { PokemonTournamentStatistic } from '../models/pokemon-tournament-statistic.model';
import { PokemonTournamentService } from './pokemon-tournament.service';

describe('PokemonTournamentService', () => {
  let service: PokemonTournamentService;
  let httpMock: HttpTestingController;

  const statisticsUrl = `${environment.apiUrl}/pokemon/tournament/statistics`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });

    service = TestBed.inject(PokemonTournamentService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('requests the statistics endpoint with sortBy and sortDirection as query params', () => {
    service.getStatistics('wins', 'desc').subscribe();

    const req = httpMock.expectOne(
      (request) => request.url === statisticsUrl && request.method === 'GET'
    );

    expect(req.request.params.get('sortBy')).toBe('wins');
    expect(req.request.params.get('sortDirection')).toBe('desc');

    req.flush([]);
  });

  it('emits the statistics returned by the API', () => {
    const mockStatistics: PokemonTournamentStatistic[] = [
      { id: 1, name: 'bulbasaur', type: 'grass', wins: 6, losses: 6, ties: 4 }
    ];

    let result: PokemonTournamentStatistic[] | undefined;
    service.getStatistics('name', 'asc').subscribe((statistics) => (result = statistics));

    const req = httpMock.expectOne((request) => request.url === statisticsUrl);
    req.flush(mockStatistics);

    expect(result).toEqual(mockStatistics);
  });
});
