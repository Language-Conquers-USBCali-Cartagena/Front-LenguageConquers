import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EmailVerificationComponent } from 'src/app/feature/auth/email-verification/email-verification.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistroComponent,
    RecuperarComponent,
    EmailVerificationComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
