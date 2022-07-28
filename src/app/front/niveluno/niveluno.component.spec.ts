import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelunoComponent } from './niveluno.component';

describe('NivelunoComponent', () => {
  let component: NivelunoComponent;
  let fixture: ComponentFixture<NivelunoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelunoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelunoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
