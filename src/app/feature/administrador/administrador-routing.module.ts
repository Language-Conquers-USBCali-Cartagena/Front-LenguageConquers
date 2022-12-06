import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarArticulosComponent } from "./articulos/listar-articulos/listar-articulos.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";

const routes:Routes = [
  {
    path: '',
    component:DashboardComponent,
    children: [
      {
        path: 'articulos/lista-articulos',
        component:ListarArticulosComponent
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRouterModule{}
