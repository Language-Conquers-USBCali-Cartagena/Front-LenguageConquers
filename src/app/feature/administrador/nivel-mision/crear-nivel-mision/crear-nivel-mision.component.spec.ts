import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearNivelMisionComponent } from './crear-nivel-mision.component';

describe('CrearNivelMisionComponent', () => {
  let component: CrearNivelMisionComponent;
  let fixture: ComponentFixture<CrearNivelMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearNivelMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearNivelMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
