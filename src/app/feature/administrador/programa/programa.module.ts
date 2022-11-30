import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearProgramaComponent } from './crear-programa/crear-programa.component';
import { ListarProgramasComponent } from './listar-programas/listar-programas.component';



@NgModule({
  declarations: [
    CrearProgramaComponent,
    ListarProgramasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ProgramaModule { }
