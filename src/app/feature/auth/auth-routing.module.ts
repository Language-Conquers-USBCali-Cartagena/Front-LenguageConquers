import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registro',
    component: RegistroComponent,
  },
  {
    path: 'recuperar',
    component: RecuperarComponent,
  },
  {
    path: 'verificar-email',
    component: EmailVerificationComponent,
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
