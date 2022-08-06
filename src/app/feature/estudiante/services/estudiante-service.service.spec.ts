import { TestBed } from '@angular/core/testing';

import { EstudianteServiceService } from './estudiante-service.service';

describe('EstudianteServiceService', () => {
  let service: EstudianteServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstudianteServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
