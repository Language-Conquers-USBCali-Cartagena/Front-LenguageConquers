import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasCursosComponent } from './tarjetas-cursos.component';

describe('TarjetasCursosComponent', () => {
  let component: TarjetasCursosComponent;
  let fixture: ComponentFixture<TarjetasCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TarjetasCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
