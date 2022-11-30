import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMisionesComponent } from './crear-misiones.component';

describe('CrearMisionesComponent', () => {
  let component: CrearMisionesComponent;
  let fixture: ComponentFixture<CrearMisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearMisionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearMisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
