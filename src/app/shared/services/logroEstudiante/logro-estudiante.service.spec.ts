import { TestBed } from '@angular/core/testing';

import { LogroEstudianteService } from './logro-estudiante.service';

describe('LogroEstudianteService', () => {
  let service: LogroEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogroEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
