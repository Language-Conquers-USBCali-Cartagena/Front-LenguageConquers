import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarAvatarComponent } from './crear-modificar-avatar.component';

describe('CrearModificarAvatarComponent', () => {
  let component: CrearModificarAvatarComponent;
  let fixture: ComponentFixture<CrearModificarAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
