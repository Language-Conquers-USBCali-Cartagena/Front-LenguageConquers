import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PerfilEstudianteComponent } from "../perfil-estudiante/perfil-estudiante.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InicioComponent } from "./inicio/inicio.component";
import { DragDrog1Component } from './drag-drog1/drag-drog1.component';
import { AuthGuardGuard } from "../shared/guards/authGuard.guard";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardGuard],
    children: [
      {
        path: '',
        component: InicioComponent,
      },
      {
        path: 'perfilEstudiante',
        component: PerfilEstudianteComponent
      },
      {
        path: 'inicio',
        component: DragDrog1Component
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginaPrincipalRoutingModule { }
