import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { TarjetasCursosComponent } from './tarjetas-cursos/tarjetas-cursos.component';
import { NgModule, Component } from '@angular/core';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { NotificacionesComponent } from '../../core/features/notificacion/notificaciones.component';
import { TiendaPrincipalComponent } from '../../core/features/tienda-principal/tienda-principal.component';
import { TarjetasLogrosComponent } from 'src/app/core/features/tarjetas-logros/tarjetas-logros.component';
import { RankingComponent } from 'src/app/core/features/ranking/ranking.component';
import { ArticulosAdquiridosComponent } from './articulos-adquiridos/articulos-adquiridos.component';
import { EstudianteGuardGuard } from 'src/app/core/guards/estudiante-guard.guard';





const routes:Routes = [
    {
        path: '',
        component: EstudianteComponent,
        canActivate: [AuthGuardGuard, EstudianteGuardGuard],
        children: [
            {
                path: 'menu',
                component: TarjetasCursosComponent
            },
            {
                path: 'perfil',
                component: PerfilEstudianteComponent
            },
            {
                path: 'logros',
                component: TarjetasLogrosComponent
            },
            {
                path: 'ranking',
                component: RankingComponent
            },
            {
                path: 'notificaciones',
                component: NotificacionesComponent
            },
            {
                path: 'tienda',
                component: TiendaPrincipalComponent
            },
            {
                path: 'articulos-adquiridos',
                component: ArticulosAdquiridosComponent
            },
            {
                path: 'curso',
                loadChildren:()=>import('./curso/curso.module').then(m => m.CursoModule)
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class EstudianteRoutingModule{ }
