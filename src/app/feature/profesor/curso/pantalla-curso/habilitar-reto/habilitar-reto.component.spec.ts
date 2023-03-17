import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitarRetoComponent } from './habilitar-reto.component';

describe('HabilitarRetoComponent', () => {
  let component: HabilitarRetoComponent;
  let fixture: ComponentFixture<HabilitarRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HabilitarRetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HabilitarRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
