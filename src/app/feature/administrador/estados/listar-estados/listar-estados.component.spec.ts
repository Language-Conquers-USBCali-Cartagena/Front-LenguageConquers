import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEstadosComponent } from './listar-estados.component';

describe('ListarEstadosComponent', () => {
  let component: ListarEstadosComponent;
  let fixture: ComponentFixture<ListarEstadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarEstadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEstadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
