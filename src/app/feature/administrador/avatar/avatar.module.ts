import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearAvatarComponent } from './crear-avatar/crear-avatar.component';
import { ListarAvatarComponent } from './listar-avatar/listar-avatar.component';



@NgModule({
  declarations: [
    CrearAvatarComponent,
    ListarAvatarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AvatarModule { }
