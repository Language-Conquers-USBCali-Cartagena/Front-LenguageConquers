import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarLogrosComponent } from './crear-modificar-logros.component';

describe('CrearModificarLogrosComponent', () => {
  let component: CrearModificarLogrosComponent;
  let fixture: ComponentFixture<CrearModificarLogrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarLogrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarLogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
