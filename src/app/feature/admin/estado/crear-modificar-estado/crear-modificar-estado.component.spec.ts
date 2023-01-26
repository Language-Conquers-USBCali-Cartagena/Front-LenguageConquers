import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarEstadoComponent } from './crear-modificar-estado.component';

describe('CrearModificarEstadoComponent', () => {
  let component: CrearModificarEstadoComponent;
  let fixture: ComponentFixture<CrearModificarEstadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarEstadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
