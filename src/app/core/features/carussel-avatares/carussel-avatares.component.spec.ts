import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarusselAvataresComponent } from './carussel-avatares.component';

describe('CarusselAvataresComponent', () => {
  let component: CarusselAvataresComponent;
  let fixture: ComponentFixture<CarusselAvataresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarusselAvataresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarusselAvataresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
