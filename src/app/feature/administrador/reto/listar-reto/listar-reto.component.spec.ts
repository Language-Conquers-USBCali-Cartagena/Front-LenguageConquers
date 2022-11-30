import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRetoComponent } from './listar-reto.component';

describe('ListarRetoComponent', () => {
  let component: ListarRetoComponent;
  let fixture: ComponentFixture<ListarRetoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRetoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRetoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
