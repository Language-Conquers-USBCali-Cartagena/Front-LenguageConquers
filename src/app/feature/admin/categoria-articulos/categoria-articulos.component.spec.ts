import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaArticulosComponent } from './categoria-articulos.component';

describe('CategoriaArticulosComponent', () => {
  let component: CategoriaArticulosComponent;
  let fixture: ComponentFixture<CategoriaArticulosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaArticulosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaArticulosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
