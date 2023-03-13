import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoProfesorComponent } from './curso/curso-profesor.component';
import { MisEstudiantesComponent } from './mis-estudiantes/mis-estudiantes.component';
import { PantallaCursoComponent } from './pantalla-curso/pantalla-curso.component';
import { CursoProfesorRoutingModule } from './curso-profesor-routing.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { ListaRetosComponent } from './configurarReto/lista-retos/lista-retos.component';
import { HabilitarRetoComponent } from './configurarReto/habilitar-reto/habilitar-reto.component';



@NgModule({
  declarations: [
    CursoProfesorComponent,
    MisEstudiantesComponent,
    PantallaCursoComponent,
    ListaRetosComponent,
    HabilitarRetoComponent
  ],
  imports: [
    CommonModule,
    CursoProfesorRoutingModule,
    CoreModule,
    MaterialModule
  ]
})
export class CursoProfesorModule { }
