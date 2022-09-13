import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogrosPageComponent } from "./logros-page/logros-page.component";
import { TarjetasLogrosComponent } from "./tarjetas-logros/tarjetas-logros.component";

const routes:Routes = [
  {
      path: '',
      component: LogrosPageComponent,

      children: [
          {
              path: 'logros',
              component: TarjetasLogrosComponent
          }
      ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogrosRoutingsModule {}
