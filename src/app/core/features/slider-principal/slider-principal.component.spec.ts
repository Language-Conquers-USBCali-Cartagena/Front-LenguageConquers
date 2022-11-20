import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderPrincipalComponent } from './slider-principal.component';

describe('SliderPrincipalComponent', () => {
  let component: SliderPrincipalComponent;
  let fixture: ComponentFixture<SliderPrincipalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SliderPrincipalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SliderPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
