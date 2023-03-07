import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './curso/curso.component';
import { DragAndDropComponent } from './reto/drag-and-drop/drag-and-drop.component';
import { MapaComponent } from './mapa/mapa.component';
import { ArticulosAdquiridosComponent } from './articulos-adquiridos/articulos-adquiridos.component';




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
                path: 'ide/:curso/:reto',
                component: DragAndDropComponent
            },
            {
              path: 'drag',
              component: DragAndDropComponent
            },
            {
              path: 'articulosAdquiridos',
              component: ArticulosAdquiridosComponent
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CursoRoutingModule{ }
