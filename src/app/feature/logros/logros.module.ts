import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogrosPageComponent } from './logros-page/logros-page.component';
import { TarjetasLogrosComponent } from './tarjetas-logros/tarjetas-logros.component';
import { LogrosRoutingsModule } from './logros-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';



@NgModule({
  declarations: [
    LogrosPageComponent,
    TarjetasLogrosComponent,
  ],
  imports: [
    CommonModule,
    LogrosRoutingsModule,
    CoreModule,
    MaterialModule
  ],providers: [

  ]
})
export class LogrosModule { }
