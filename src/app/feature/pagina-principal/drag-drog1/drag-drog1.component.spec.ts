import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragDrog1Component } from './drag-drog1.component';

describe('DragDrog1Component', () => {
  let component: DragDrog1Component;
  let fixture: ComponentFixture<DragDrog1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragDrog1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragDrog1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
