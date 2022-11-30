import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMisionesComponent } from './listar-misiones.component';

describe('ListarMisionesComponent', () => {
  let component: ListarMisionesComponent;
  let fixture: ComponentFixture<ListarMisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarMisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
