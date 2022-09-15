import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso/curso.component';
import { DragAndDropComponent } from './drag-and-drop/drag-and-drop.component';

import { MapaComponent } from './mapa/mapa.component';
import { NivelDescripcionComponent } from './nivel-descripcion/nivel-descripcion.component';
import { NivelIDEComponent } from './nivel-ide/nivel-ide.component';




const routes:Routes = [
    {
        path: '',
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
            },
            {
              path: 'drag',
              component: DragAndDropComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursoRoutingModule{ }
