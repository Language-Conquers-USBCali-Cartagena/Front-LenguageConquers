import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCategoriaComponent } from './crear-categoria/crear-categoria.component';
import { ListarCategoriaComponent } from './listar-categoria/listar-categoria.component';



@NgModule({
  declarations: [
    CrearCategoriaComponent,
    ListarCategoriaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoriaArticulosModule { }
