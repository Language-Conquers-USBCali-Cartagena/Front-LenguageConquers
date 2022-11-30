import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarArticulosComponent } from './listar-articulos/listar-articulos.component';
import { CrearArticuloComponent } from './crear-articulo/crear-articulo.component';



@NgModule({
  declarations: [
    ListarArticulosComponent,
    CrearArticuloComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ArticulosModule { }
