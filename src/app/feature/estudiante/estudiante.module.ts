import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TarjetasCursosComponent } from './tarjetas-cursos/tarjetas-cursos.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { CoreModule } from '../../core/core.module';
import { MaterialModule } from '../../shared/material/material.module';
import { EstudianteServiceService } from './services/estudiante-service.service';



@NgModule({
  declarations: [
    TarjetasCursosComponent,
    EstudianteComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    CoreModule,
    MaterialModule,

  ],
  providers: [
    EstudianteServiceService
  ]
})
export class EstudianteModule { }
