import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { MapaComponent } from '../curso/mapa/mapa.component';
import { PantallaCursoComponent } from './curso/pantalla-curso/pantalla-curso.component';
import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { RankingComponent } from 'src/app/core/features/ranking/ranking.component';



const routes:Routes = [
    {
        path: '',
        component: ProfesorComponent,
        // canActivate: [AuthGuardGuard],
        children: [
            {
                path: 'menuProfesor',
                component: MenuProfesorComponent
            },
            {
              path:'perfil',
              component:PerfilProfesorComponent
            },
            {
              path:'ranking',
              component: RankingComponent
            },
            {
              path:'curso',
              component:PantallaCursoComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfesorRoutingModule{ }
