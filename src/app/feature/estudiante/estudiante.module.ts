import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetasCursosComponent } from './tarjetas-cursos/tarjetas-cursos.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../shared/material/material.module';
import { EstudianteServiceService } from './services/estudiante-service.service';
import { ArticulosAdquiridosComponent } from './articulos-adquiridos/articulos-adquiridos.component';
import { CursoModule } from './curso/curso.module';




@NgModule({
  declarations: [
    TarjetasCursosComponent,
    EstudianteComponent,
    ArticulosAdquiridosComponent


  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    CoreModule,
    MaterialModule,
  ],
  exports: [
    CursoModule
  ],
  providers: [
    EstudianteServiceService
  ]
})
export class EstudianteModule { }
