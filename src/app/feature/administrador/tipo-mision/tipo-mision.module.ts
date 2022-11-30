import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarTipoMisionComponent } from './listar-tipo-mision/listar-tipo-mision.component';
import { CrearTipoMisionComponent } from './crear-tipo-mision/crear-tipo-mision.component';



@NgModule({
  declarations: [
    ListarTipoMisionComponent,
    CrearTipoMisionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TipoMisionModule { }
