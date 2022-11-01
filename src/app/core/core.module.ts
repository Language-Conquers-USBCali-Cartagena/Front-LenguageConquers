import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { CarusselAvataresComponent } from './features/carussel-avatares/carussel-avatares.component';
import { MenuComponent } from './features/menu/menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './features/footer/footer.component';
import { SliderPrincipalComponent } from './features/slider-principal/slider-principal.component';



@NgModule({
  declarations: [
    CarusselAvataresComponent,
    MenuComponent,
    FooterComponent,
    SliderPrincipalComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    CarusselAvataresComponent,
    SliderPrincipalComponent,
    MenuComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
