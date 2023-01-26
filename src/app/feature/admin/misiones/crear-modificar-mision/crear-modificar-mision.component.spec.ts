import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearModificarMisionComponent } from './crear-modificar-mision.component';

describe('CrearModificarMisionComponent', () => {
  let component: CrearModificarMisionComponent;
  let fixture: ComponentFixture<CrearModificarMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearModificarMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearModificarMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
