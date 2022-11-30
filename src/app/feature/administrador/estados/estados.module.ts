import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearEstadoComponent } from './crear-estado/crear-estado.component';
import { ListarEstadosComponent } from './listar-estados/listar-estados.component';



@NgModule({
  declarations: [
    CrearEstadoComponent,
    ListarEstadosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EstadosModule { }
