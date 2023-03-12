import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { PantallaCursoComponent } from './curso/pantalla-curso/pantalla-curso.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { ProfesorServicesService } from './services/services.service';
import { ConfigurarRetoComponent } from './curso/configurar-reto/configurar-reto.component';
import { MisEstudiantesComponent } from './curso/mis-estudiantes/mis-estudiantes.component';
import { CursoComponent } from './curso/curso/curso.component';



@NgModule({
  declarations: [
    ProfesorComponent,
    MenuProfesorComponent,
    CursoComponent,
    PerfilProfesorComponent,
    ConfigurarRetoComponent,
    MisEstudiantesComponent
  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    MaterialModule,
    CoreModule
  ],
  providers: [
    ProfesorServicesService
  ]
})
export class ProfesorModule { }
