import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoComponent } from './curso/curso.component';
import { CursoRoutingModule } from './curso-routing.module';
import { MapaComponent } from './mapa/mapa.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { DragAndDropComponent } from './reto/drag-and-drop/drag-and-drop.component';

@NgModule({
  declarations: [
    CursoComponent,
    MapaComponent,
    DragAndDropComponent,
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
