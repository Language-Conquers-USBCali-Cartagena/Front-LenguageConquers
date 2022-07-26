import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material/material.module';
import { CarusselAvataresComponent } from './features/carussel-avatares/carussel-avatares.component';



@NgModule({
  declarations: [
  
    CarusselAvataresComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports:[
    CarusselAvataresComponent
  ]
})
export class CoreModule { }
