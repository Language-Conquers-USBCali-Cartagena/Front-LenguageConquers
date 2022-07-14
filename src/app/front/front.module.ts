import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
   
  
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FrontRoutingModule,
    MaterialModule
  ]
})
export class FrontModule { }
