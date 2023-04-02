import { TestBed } from '@angular/core/testing';

import { CursoEstudianteService } from './curso-estudiante.service';

describe('CursoEstudianteService', () => {
  let service: CursoEstudianteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CursoEstudianteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
