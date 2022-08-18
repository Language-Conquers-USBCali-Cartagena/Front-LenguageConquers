import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelDescripcionComponent } from './nivel-descripcion.component';

describe('NivelDescripcionComponent', () => {
  let component: NivelDescripcionComponent;
  let fixture: ComponentFixture<NivelDescripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelDescripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelDescripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
