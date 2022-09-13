import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogrosPageComponent } from './logros-page.component';

describe('LogrosPageComponent', () => {
  let component: LogrosPageComponent;
  let fixture: ComponentFixture<LogrosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogrosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogrosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
