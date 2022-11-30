import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarAvatarComponent } from './listar-avatar.component';

describe('ListarAvatarComponent', () => {
  let component: ListarAvatarComponent;
  let fixture: ComponentFixture<ListarAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
