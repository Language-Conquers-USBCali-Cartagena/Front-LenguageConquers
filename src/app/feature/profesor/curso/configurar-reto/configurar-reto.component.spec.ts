import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigurarRetoComponent } from './configurar-reto.component';

describe('ConfigurarRetoComponent', () => {
  let component: ConfigurarRetoComponent;
  let fixture: ComponentFixture<ConfigurarRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigurarRetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigurarRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
