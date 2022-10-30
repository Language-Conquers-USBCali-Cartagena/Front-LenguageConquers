import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { CarusselAvataresComponent } from './features/carussel-avatares/carussel-avatares.component';
import { MenuComponent } from './features/menu/menu.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './features/footer/footer.component';



@NgModule({
  declarations: [
    CarusselAvataresComponent,
    MenuComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:[
    CarusselAvataresComponent,
    MenuComponent,
    FooterComponent,
  ]
})
export class CoreModule { }
