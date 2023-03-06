import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarEstudianteComponent } from './crear-modificar-estudiante.component';

describe('CrearModificarEstudianteComponent', () => {
  let component: CrearModificarEstudianteComponent;
  let fixture: ComponentFixture<CrearModificarEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
