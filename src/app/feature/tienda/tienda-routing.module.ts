import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TiendaPrincipalComponent } from "./tienda-principal/tienda-principal.component";
import { TiendaComponent } from './tienda/tienda.component';


const routes:Routes = [
  {
      path: '',
      component: TiendaComponent,

      children: [
          {
              path: 'principal',
              component: TiendaPrincipalComponent
          }
      ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaRoutingsModule {}
