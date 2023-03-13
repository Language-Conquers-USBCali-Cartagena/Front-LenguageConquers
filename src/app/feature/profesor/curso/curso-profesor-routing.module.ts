import { RouterModule, Routes } from "@angular/router";
import { CursoProfesorComponent } from './curso/curso-profesor.component';
import { PantallaCursoComponent } from './pantalla-curso/pantalla-curso.component';
import { NgModule } from "@angular/core";

const routes: Routes =[
 {
  path: '',
  component: CursoProfesorComponent,
  children: [
    {
      path: 'configuracion-curso/:curso',
      component: PantallaCursoComponent
    }
  ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoProfesorRoutingModule{}
