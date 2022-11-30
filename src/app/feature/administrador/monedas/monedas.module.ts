import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearMonedasComponent } from './crear-monedas/crear-monedas.component';
import { ListarMonedasComponent } from './listar-monedas/listar-monedas.component';



@NgModule({
  declarations: [
    CrearMonedasComponent,
    ListarMonedasComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MonedasModule { }
