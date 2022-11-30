import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarNivelMisionComponent } from './listar-nivel-mision.component';

describe('ListarNivelMisionComponent', () => {
  let component: ListarNivelMisionComponent;
  let fixture: ComponentFixture<ListarNivelMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarNivelMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarNivelMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
