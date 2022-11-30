import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearNivelMisionComponent } from './crear-nivel-mision/crear-nivel-mision.component';
import { ListarNivelMisionComponent } from './listar-nivel-mision/listar-nivel-mision.component';



@NgModule({
  declarations: [
    CrearNivelMisionComponent,
    ListarNivelMisionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class NivelMisionModule { }
