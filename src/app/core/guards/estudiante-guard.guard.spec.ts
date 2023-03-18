import { TestBed } from '@angular/core/testing';

import { EstudianteGuardGuard } from './estudiante-guard.guard';

describe('EstudianteGuardGuard', () => {
  let guard: EstudianteGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EstudianteGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
