import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisEstudiantesComponent } from './mis-estudiantes.component';

describe('MisEstudiantesComponent', () => {
  let component: MisEstudiantesComponent;
  let fixture: ComponentFixture<MisEstudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisEstudiantesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
