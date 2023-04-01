import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { ListaRetosComponent } from "./lista-retos/lista-retos.component";
import { PantallaCursoComponent } from "./pantalla-curso/pantalla-curso.component";
import { HabilitarRetoComponent } from './habilitar-reto/habilitar-reto.component';
import { MisEstudiantesComponent } from '../mis-estudiantes/mis-estudiantes.component';
import { ProgresoEstudianteComponent } from './progreso-estudiante/progreso-estudiante.component';

const routes: Routes =[
 {
  path: '',
  component: PantallaCursoComponent,
  children: [
    {
        path: '',
        redirectTo: 'lista-curso',
        pathMatch: 'full'
    },
    {
        path: 'lista-curso',
        component: ListaRetosComponent,
    },
    {
        path: 'editar-reto/:id',
        component: HabilitarRetoComponent
    },
    {
      path: 'mis-estudiantes',
      component:MisEstudiantesComponent
    },
    {
      path: 'progreso-estudiante/:id',
      component:ProgresoEstudianteComponent
    }
  ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallaCursoRoutingModule{}
