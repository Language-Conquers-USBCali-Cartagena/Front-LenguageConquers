import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MaterialModule } from "src/app/shared/material/material.module";
import { AdministradorRouterModule } from "./administrador-routing.module";
import { ListarArticulosComponent } from "./articulos/listar-articulos/listar-articulos.component";
import { DashboardComponent } from "./home/dashboard/dashboard.component";
import { CoreModule } from '../../core/core.module';
import { TarjetasComponent } from './home/tarjetas/tarjetas.component';
import { CrearArticuloComponent } from './articulos/crear-articulo/crear-articulo.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ListarArticulosComponent,
    CrearArticuloComponent,
    TarjetasComponent
  ],
  imports: [
    CommonModule,
    AdministradorRouterModule,
    CoreModule,
    MaterialModule,

  ]
})
  export class AdministradorModule {}
