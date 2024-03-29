import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';


import { PerfilProfesorComponent } from './perfil-profesor/perfil-profesor.component';
import { RankingComponent } from 'src/app/core/features/ranking/ranking.component';
import { AuthGuardGuard } from 'src/app/core/guards/authGuard.guard';
import { ProfesorGuardGuard } from '../../core/guards/profesor-guard.guard';




const routes:Routes = [
    {
        path: '',
        component: ProfesorComponent,
        canActivate: [ProfesorGuardGuard],
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
              path: 'curso',
              loadChildren:()=>import('./curso/curso-profesor.module').then(m => m.CursoProfesorModule)
          }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfesorRoutingModule{ }
