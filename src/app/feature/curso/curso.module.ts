import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso/curso.component';
import { CursoRoutingModule } from './curso-routing.module';
import { MapaComponent } from './mapa/mapa.component';
import { NivelDescripcionComponent } from './nivel-descripcion/nivel-descripcion.component';
import { NivelIDEComponent } from './nivel-ide/nivel-ide.component';



@NgModule({
  declarations: [
    CursoComponent,
    MapaComponent,
    NivelDescripcionComponent,
    NivelIDEComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule
  ],
  providers: [
    
  ]
})
export class CursoModule { }
