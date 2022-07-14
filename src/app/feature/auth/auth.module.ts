import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EmailVerificationComponent } from 'src/app/feature/auth/email-verification/email-verification.component';
import {MatRadioModule} from '@angular/material/radio';
import { ServiciosLoginService } from '../../shared/services/Login/servicios-login.service';
import { CrearUsuarioComponent } from './crearUsuario/crear-usuario/crear-usuario.component';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';
import { FormularioProfesorComponent } from './crearUsuario/formulario-profesor/formulario-profesor.component';
import { FormularioEstudianteComponent } from './crearUsuario/formulario-estudiante/formulario-estudiante.component';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    EmailVerificationComponent,
    CrearUsuarioComponent,
    AutenticacionComponent,
    FormularioProfesorComponent,
    FormularioEstudianteComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    MatGridListModule
    
  ],
  providers: [
    ServiciosLoginService
  ]
})
export class AuthModule { }
