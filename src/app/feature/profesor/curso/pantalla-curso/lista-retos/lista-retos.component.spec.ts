import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRetosComponent } from './lista-retos.component';

describe('ListaRetosComponent', () => {
  let component: ListaRetosComponent;
  let fixture: ComponentFixture<ListaRetosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRetosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRetosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
