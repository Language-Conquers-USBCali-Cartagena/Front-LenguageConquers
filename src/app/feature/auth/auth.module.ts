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
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
    
  ]
})
export class AuthModule { }
