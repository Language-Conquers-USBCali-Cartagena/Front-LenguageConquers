import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMonedasComponent } from './listar-monedas.component';

describe('ListarMonedasComponent', () => {
  let component: ListarMonedasComponent;
  let fixture: ComponentFixture<ListarMonedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMonedasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMonedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
