import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogComponent } from './dialog/dialog.component';
import { NotificacionesComponent } from './notificacion/notificaciones.component';
const routes:Routes = [
  {
      path: '',
      component: NotificacionesComponent,

      children: [
          {
              path: 'notificacionesDialog',
              component: DialogComponent,
          }
      ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificacionesRoutingsModule {}
