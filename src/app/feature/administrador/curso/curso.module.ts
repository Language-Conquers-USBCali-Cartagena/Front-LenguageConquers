import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearCursoComponent } from './crear-curso/crear-curso.component';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';



@NgModule({
  declarations: [
    CrearCursoComponent,
    ListarCursosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CursoModule { }
