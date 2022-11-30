import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearMisionesComponent } from './crear-misiones/crear-misiones.component';
import { ListarMisionesComponent } from './listar-misiones/listar-misiones.component';



@NgModule({
  declarations: [
    CrearMisionesComponent,
    ListarMisionesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MisionesModule { }
