import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [
    MenuComponent,
    EstudianteComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    CoreModule,
    MaterialModule
  ]
})
export class EstudianteModule { }
