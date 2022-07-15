import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';




@NgModule({
  declarations: [
  
    SidebarComponent,
    ProfesorComponent,
    MenuProfesorComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    MaterialModule
  ]
})
export class FrontModule { }
