import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelunoinfoComponent } from './nivelunoinfo.component';

describe('NivelunoinfoComponent', () => {
  let component: NivelunoinfoComponent;
  let fixture: ComponentFixture<NivelunoinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelunoinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelunoinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
