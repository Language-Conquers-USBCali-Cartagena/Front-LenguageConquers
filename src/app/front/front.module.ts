import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { MaterialModule } from '../shared/material/material.module';

import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { InicioProfesorComponent } from './inicio-profesor/inicio-profesor.component';
import { InicioEstudianteComponent } from './inicio-estudiante/inicio-estudiante.component';
import { VistaComponent } from './vista/vista.component';
import { NivelunoinfoComponent } from './nivelunoinfo/nivelunoinfo.component';
import { NivelunoComponent } from './niveluno/niveluno.component';





@NgModule({
  declarations: [

    ProfesorComponent,
    MenuProfesorComponent,
    InicioProfesorComponent,
    InicioEstudianteComponent,
    VistaComponent,
    NivelunoinfoComponent,
    NivelunoComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    MaterialModule,
    
  ]
})
export class FrontModule { }
