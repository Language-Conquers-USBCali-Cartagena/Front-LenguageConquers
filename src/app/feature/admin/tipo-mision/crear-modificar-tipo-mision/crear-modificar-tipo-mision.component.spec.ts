import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarTipoMisionComponent } from './crear-modificar-tipo-mision.component';

describe('CrearModificarTipoMisionComponent', () => {
  let component: CrearModificarTipoMisionComponent;
  let fixture: ComponentFixture<CrearModificarTipoMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarTipoMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarTipoMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
