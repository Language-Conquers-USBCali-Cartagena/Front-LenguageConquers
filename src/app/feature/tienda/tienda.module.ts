import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiendaPrincipalComponent } from './tienda-principal/tienda-principal.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { TiendaComponent } from './tienda/tienda.component';
import { TiendaRoutingsModule } from './tienda-routing.module';



@NgModule({
  declarations: [
    TiendaComponent,
    TiendaPrincipalComponent,
  ],
  imports: [
    CommonModule,
    TiendaRoutingsModule,
    CoreModule,
    MaterialModule,

  ]
})
export class TiendaModule { }
