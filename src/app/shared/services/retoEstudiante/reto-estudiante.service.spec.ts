import { TestBed } from '@angular/core/testing';

import { RetoEstudianteService } from './reto-estudiante.service';

describe('RetoEstudianteService', () => {
  let service: RetoEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RetoEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
