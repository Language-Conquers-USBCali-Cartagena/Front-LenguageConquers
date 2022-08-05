import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { NgModule } from '@angular/core';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';



const routes:Routes = [
    {
        path: '',
        component: ProfesorComponent,
        // canActivate: [AuthGuardGuard],
        children: [
            {
                path: 'menu/:correo',
                component: MenuProfesorComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfesorRoutingModule{ }