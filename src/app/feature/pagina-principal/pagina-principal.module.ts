import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PaginaPrincipalRoutingModule } from './pagina-principal-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DragDrog1Component } from './drag-drog1/drag-drog1.component';
import { InicioComponent } from './inicio/inicio.component';



@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    DragDrog1Component
  ],
  imports: [
    CommonModule,
    PaginaPrincipalRoutingModule,
    MaterialModule
  ],
  exports: [
    NavbarComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PaginaPrincipalModule { }