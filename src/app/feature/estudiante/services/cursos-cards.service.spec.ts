import { TestBed } from '@angular/core/testing';

import { CursosCardsService } from './cursos-cards.service';

describe('CursosCardsService', () => {
  let service: CursosCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursosCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
