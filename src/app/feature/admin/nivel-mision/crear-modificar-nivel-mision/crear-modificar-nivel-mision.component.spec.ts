import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarNivelMisionComponent } from './crear-modificar-nivel-mision.component';

describe('CrearModificarNivelMisionComponent', () => {
  let component: CrearModificarNivelMisionComponent;
  let fixture: ComponentFixture<CrearModificarNivelMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarNivelMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarNivelMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
