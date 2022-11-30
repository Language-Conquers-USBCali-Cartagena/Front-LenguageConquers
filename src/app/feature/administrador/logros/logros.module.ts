import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearLogroComponent } from './crear-logro/crear-logro.component';
import { ListarLogrosComponent } from './listar-logros/listar-logros.component';



@NgModule({
  declarations: [
    CrearLogroComponent,
    ListarLogrosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LogrosModule { }
