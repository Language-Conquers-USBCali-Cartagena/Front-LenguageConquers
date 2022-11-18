import { Routes, RouterModule } from '@angular/router';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { NgModule } from '@angular/core';
import { ProfesorComponent } from './profesor/profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { CursoComponent } from './curso/curso.component';
import { MapaComponent } from '../curso/mapa/mapa.component';
import { NivelDescripcionComponent } from '../curso/nivel-descripcion/nivel-descripcion.component';
import { NivelIDEComponent } from '../curso/nivel-ide/nivel-ide.component';



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
              path: 'curso/:id',
              component: CursoComponent,
              children: [
                {
                  path: 'mapa/:curso',
                  component: MapaComponent
              },
              {
                  path: 'descripcion/:curso/:reto',
                  component: NivelDescripcionComponent
              },
              {
                  path: 'ide/:curso/:reto',
                  component: NivelIDEComponent
              }
              ]
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ProfesorRoutingModule{ }
