import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosAdquiridosComponent } from './articulos-adquiridos.component';

describe('ArticulosAdquiridosComponent', () => {
  let component: ArticulosAdquiridosComponent;
  let fixture: ComponentFixture<ArticulosAdquiridosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosAdquiridosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticulosAdquiridosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
