import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesComponent } from './notificacion/notificaciones.component';
import { DialogComponent } from './dialog/dialog.component';
import { NotificacionesRoutingsModule } from './notificaciones-routing.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { CoreModule } from 'src/app/core/core.module';




@NgModule({
  declarations: [
    NotificacionesComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    NotificacionesRoutingsModule,
    CoreModule,
    MaterialModule,

  ]
})
export class NotificacionesModule { }
