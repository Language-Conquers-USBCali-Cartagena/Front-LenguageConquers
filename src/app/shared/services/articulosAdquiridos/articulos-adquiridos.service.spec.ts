import { TestBed } from '@angular/core/testing';

import { ArticulosAdquiridosService } from './articulos-adquiridos.service';

describe('ArticulosAdquiridosService', () => {
  let service: ArticulosAdquiridosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticulosAdquiridosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
