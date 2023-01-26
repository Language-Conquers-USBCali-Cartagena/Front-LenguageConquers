import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarProgramaComponent } from './crear-modificar-programa.component';

describe('CrearModificarProgramaComponent', () => {
  let component: CrearModificarProgramaComponent;
  let fixture: ComponentFixture<CrearModificarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarProgramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
