import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';



const routes:Routes = [
    {
        path: '',
        component: EstudianteComponent,
        // canActivate: [AuthGuardGuard],
        children: [
            {
                path: 'menu/:correo',
                component: MenuComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EstudianteRoutingModule{ }