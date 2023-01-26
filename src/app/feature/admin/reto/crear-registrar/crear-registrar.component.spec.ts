import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearRegistrarComponent } from './crear-registrar.component';

describe('CrearRegistrarComponent', () => {
  let component: CrearRegistrarComponent;
  let fixture: ComponentFixture<CrearRegistrarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearRegistrarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearRegistrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
