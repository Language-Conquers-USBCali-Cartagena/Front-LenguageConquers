import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoMisionComponent } from './crear-tipo-mision.component';

describe('CrearTipoMisionComponent', () => {
  let component: CrearTipoMisionComponent;
  let fixture: ComponentFixture<CrearTipoMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearTipoMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearTipoMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
