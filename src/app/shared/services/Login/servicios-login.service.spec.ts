import { TestBed } from '@angular/core/testing';

import { ServiciosLoginService } from './servicios-login.service';

describe('ServiciosLoginService', () => {
  let service: ServiciosLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
