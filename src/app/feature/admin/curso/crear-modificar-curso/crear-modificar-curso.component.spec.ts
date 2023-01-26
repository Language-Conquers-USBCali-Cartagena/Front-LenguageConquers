import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarCursoComponent } from './crear-modificar-curso.component';

describe('CrearModificarCursoComponent', () => {
  let component: CrearModificarCursoComponent;
  let fixture: ComponentFixture<CrearModificarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
