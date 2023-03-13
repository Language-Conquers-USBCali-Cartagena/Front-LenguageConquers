import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CoreModule } from 'src/app/core/core.module';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { ProfesorServicesService } from './services/services.service';
import { CursoProfesorComponent } from './curso/curso/curso-profesor.component';
import { CursoProfesorModule } from './curso/curso-profesor.module';



@NgModule({
  declarations: [
    ProfesorComponent,
    MenuProfesorComponent,
    PerfilProfesorComponent,

  ],
  imports: [
    CommonModule,
    ProfesorRoutingModule,
    MaterialModule,
    CoreModule
  ],
  exports:[
    CursoProfesorModule,
  ],
  providers: [
    ProfesorServicesService
  ]
})
export class ProfesorModule { }
