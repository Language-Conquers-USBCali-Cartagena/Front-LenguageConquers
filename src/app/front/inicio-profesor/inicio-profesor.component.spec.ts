import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProfesorComponent } from './inicio-profesor.component';

describe('InicioProfesorComponent', () => {
  let component: InicioProfesorComponent;
  let fixture: ComponentFixture<InicioProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioProfesorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
