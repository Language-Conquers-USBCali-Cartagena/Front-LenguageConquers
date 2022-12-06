import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMisionComponent } from './tipo-mision.component';

describe('TipoMisionComponent', () => {
  let component: TipoMisionComponent;
  let fixture: ComponentFixture<TipoMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
