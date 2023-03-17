import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HabilitarRetoComponent } from './habilitar-reto/habilitar-reto.component';
import { ListaRetosComponent } from './lista-retos/lista-retos.component';
import { MaterialModule } from '../../../../shared/material/material.module';
import { PantallaCursoRoutingModule } from './pantalla-curso-routing.module';
import { PantallaCursoComponent } from './pantalla-curso/pantalla-curso.component';



@NgModule({
  declarations: [
    PantallaCursoComponent,
    HabilitarRetoComponent,
    ListaRetosComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PantallaCursoRoutingModule
  ]
})
export class PantallaCursoModule { }
