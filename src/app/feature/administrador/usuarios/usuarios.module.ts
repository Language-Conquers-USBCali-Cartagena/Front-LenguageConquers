import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarUsuariosComponent } from './listar-usuarios/listar-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';



@NgModule({
  declarations: [
    ListarUsuariosComponent,
    CrearUsuariosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsuariosModule { }
