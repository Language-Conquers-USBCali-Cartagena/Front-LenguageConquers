import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelMisionComponent } from './nivel-mision.component';

describe('NivelMisionComponent', () => {
  let component: NivelMisionComponent;
  let fixture: ComponentFixture<NivelMisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelMisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelMisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
