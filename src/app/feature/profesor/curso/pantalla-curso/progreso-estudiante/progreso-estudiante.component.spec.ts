import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgresoEstudianteComponent } from './progreso-estudiante.component';

describe('ProgresoEstudianteComponent', () => {
  let component: ProgresoEstudianteComponent;
  let fixture: ComponentFixture<ProgresoEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgresoEstudianteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgresoEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
