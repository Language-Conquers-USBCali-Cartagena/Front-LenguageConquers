import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearLogroComponent } from './crear-logro.component';

describe('CrearLogroComponent', () => {
  let component: CrearLogroComponent;
  let fixture: ComponentFixture<CrearLogroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearLogroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearLogroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
