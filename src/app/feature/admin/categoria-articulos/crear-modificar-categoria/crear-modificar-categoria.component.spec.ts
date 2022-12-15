import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarCategoriaComponent } from './crear-modificar-categoria.component';

describe('CrearModificarCategoriaComponent', () => {
  let component: CrearModificarCategoriaComponent;
  let fixture: ComponentFixture<CrearModificarCategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarCategoriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
