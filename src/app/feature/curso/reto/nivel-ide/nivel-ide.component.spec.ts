import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelIDEComponent } from './nivel-ide.component';

describe('NivelIDEComponent', () => {
  let component: NivelIDEComponent;
  let fixture: ComponentFixture<NivelIDEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelIDEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelIDEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
