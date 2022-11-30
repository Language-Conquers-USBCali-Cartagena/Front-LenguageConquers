import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTipoMisionComponent } from './listar-tipo-mision.component';

describe('ListarTipoMisionComponent', () => {
  let component: ListarTipoMisionComponent;
  let fixture: ComponentFixture<ListarTipoMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTipoMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarTipoMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
