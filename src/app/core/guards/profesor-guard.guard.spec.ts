import { TestBed } from '@angular/core/testing';

import { ProfesorGuardGuard } from './profesor-guard.guard';

describe('ProfesorGuardGuard', () => {
  let guard: ProfesorGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfesorGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
