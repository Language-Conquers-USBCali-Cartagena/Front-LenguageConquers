import { RouterModule, Routes } from "@angular/router";
import { CursoProfesorComponent } from './curso/curso-profesor.component';
import { NgModule } from "@angular/core";

const routes: Routes =[
 {
  path: '',
  component: CursoProfesorComponent,
  children: [
    {
      path: ':curso',
      loadChildren: ()=>import('./pantalla-curso/pantalla-curso.module').then(m => m.PantallaCursoModule)
    }
  ]
 }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoProfesorRoutingModule{}
