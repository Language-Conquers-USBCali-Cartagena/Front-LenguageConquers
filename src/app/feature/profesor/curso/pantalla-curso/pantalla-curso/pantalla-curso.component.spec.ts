import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallaCursoComponent } from './pantalla-curso.component';

describe('PantallaCursoComponent', () => {
  let component: PantallaCursoComponent;
  let fixture: ComponentFixture<PantallaCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PantallaCursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantallaCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
