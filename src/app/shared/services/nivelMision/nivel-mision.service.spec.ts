import { TestBed } from '@angular/core/testing';

import { NivelMisionService } from './nivel-mision.service';

describe('NivelMisionService', () => {
  let service: NivelMisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NivelMisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
