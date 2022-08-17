import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { MenuComponent } from './menu/menu.component';
import { NgModule } from '@angular/core';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';



const routes:Routes = [
    {
        path: '',
        component: EstudianteComponent,
        // canActivate: [AuthGuardGuard],
        children: [
            {
                path: 'menu/:correo',
                component: MenuComponent
            },
            {
                path: 'curso/:idCurso'
            },
            {
              path: 'perfil',
              component: PerfilEstudianteComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EstudianteRoutingModule{ }
