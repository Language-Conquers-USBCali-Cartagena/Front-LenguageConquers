import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAvatarComponent } from './crear-avatar.component';

describe('CrearAvatarComponent', () => {
  let component: CrearAvatarComponent;
  let fixture: ComponentFixture<CrearAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
