import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoProfesorComponent } from './curso/curso-profesor.component';
import { MisEstudiantesComponent } from './mis-estudiantes/mis-estudiantes.component';
import { CursoProfesorRoutingModule } from './curso-profesor-routing.module';
import { CoreModule } from '../../../core/core.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { ProgresoEstudianteComponent } from './pantalla-curso/progreso-estudiante/progreso-estudiante.component';



@NgModule({
  declarations: [
    CursoProfesorComponent,
    MisEstudiantesComponent,
    ProgresoEstudianteComponent,
  ],
  imports: [
    CommonModule,
    CursoProfesorRoutingModule,
    CoreModule,
    MaterialModule
  ]
})
export class CursoProfesorModule { }
