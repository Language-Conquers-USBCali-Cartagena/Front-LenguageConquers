import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso/curso.component';
import { CursoRoutingModule } from './curso-routing.module';
import { MapaComponent } from './mapa/mapa.component';
import { NivelDescripcionComponent } from './nivel-descripcion/nivel-descripcion.component';
import { NivelIDEComponent } from './nivel-ide/nivel-ide.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

@NgModule({
  declarations: [
    CursoComponent,
    MapaComponent,
    NivelDescripcionComponent,
    NivelIDEComponent,
    DragAndDropComponent
  ],
  imports: [
    CommonModule,
    CursoRoutingModule,
    CoreModule,
    MaterialModule,

  ],
  providers: [

  ]
})
export class CursoModule { }
