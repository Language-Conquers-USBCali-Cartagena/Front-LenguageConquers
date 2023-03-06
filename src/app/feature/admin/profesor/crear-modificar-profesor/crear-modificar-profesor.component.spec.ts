import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarProfesorComponent } from './crear-modificar-profesor.component';

describe('CrearModificarProfesorComponent', () => {
  let component: CrearModificarProfesorComponent;
  let fixture: ComponentFixture<CrearModificarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarProfesorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
