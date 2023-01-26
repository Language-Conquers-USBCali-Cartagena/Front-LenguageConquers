import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaModificarMonedasComponent } from './crea-modificar-monedas.component';

describe('CreaModificarMonedasComponent', () => {
  let component: CreaModificarMonedasComponent;
  let fixture: ComponentFixture<CreaModificarMonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreaModificarMonedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreaModificarMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
