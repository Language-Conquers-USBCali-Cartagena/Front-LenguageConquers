import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from './dialog.component';
import { RouterModule, Routes } from '@angular/router';



const routes:Routes = [
  {
      path: '',
      component: DialogComponent,

      children: [
          {
              path: 'notificaciones',
              component: DialogComponent
          }
      ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogModule {}
