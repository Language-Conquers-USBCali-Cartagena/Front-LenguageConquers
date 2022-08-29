import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CoreModule } from 'src/app/core/core.module';



@NgModule({
  declarations: [
    ProfesorComponent,
    MenuProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    MaterialModule,
    CoreModule
  ]
})
export class ProfesorModule { }
