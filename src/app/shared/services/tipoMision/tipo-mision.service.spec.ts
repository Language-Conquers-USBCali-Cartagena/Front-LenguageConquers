import { TestBed } from '@angular/core/testing';

import { TipoMisionService } from './tipo-mision.service';

describe('TipoMisionService', () => {
  let service: TipoMisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoMisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
