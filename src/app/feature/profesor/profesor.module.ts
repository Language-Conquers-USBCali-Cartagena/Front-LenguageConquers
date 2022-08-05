import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { InicioProfesorComponent } from './inicio-profesor/inicio-profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { MaterialModule } from '../../shared/material/material.module';



@NgModule({
  declarations: [
    ProfesorComponent,
    MenuProfesorComponent,
    InicioProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    MaterialModule
  ]
})
export class ProfesorModule { }
