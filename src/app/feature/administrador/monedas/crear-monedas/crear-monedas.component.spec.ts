import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMonedasComponent } from './crear-monedas.component';

describe('CrearMonedasComponent', () => {
  let component: CrearMonedasComponent;
  let fixture: ComponentFixture<CrearMonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMonedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
