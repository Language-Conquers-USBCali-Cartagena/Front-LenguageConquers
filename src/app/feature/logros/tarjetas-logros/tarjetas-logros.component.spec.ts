import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetasLogrosComponent } from './tarjetas-logros.component';

describe('TarjetasLogrosComponent', () => {
  let component: TarjetasLogrosComponent;
  let fixture: ComponentFixture<TarjetasLogrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarjetasLogrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetasLogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
