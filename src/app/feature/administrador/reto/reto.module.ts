import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarRetoComponent } from './listar-reto/listar-reto.component';
import { CrearRetoComponent } from './crear-reto/crear-reto.component';



@NgModule({
  declarations: [
    ListarRetoComponent,
    CrearRetoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RetoModule { }
