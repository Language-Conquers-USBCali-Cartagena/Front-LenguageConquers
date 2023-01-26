import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarArticulosComponent } from './crear-modificar-articulos.component';

describe('CrearModificarArticulosComponent', () => {
  let component: CrearModificarArticulosComponent;
  let fixture: ComponentFixture<CrearModificarArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
