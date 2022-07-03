import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { RecuperarComponent } from './recuperar/recuperar.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { CrearUsuarioComponent } from './crearUsuario/crear-usuario/crear-usuario.component';
import { AuthGuardGuard } from '../../core/guards/authGuard.guard';
import { AutenticacionComponent } from './autenticacion/autenticacion.component';

const routes: Routes = [
  

  {
    path: '',
    component: AutenticacionComponent,
    // canActivate: [AuthGuardGuard],
    children: [
      
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
      },
      {
        path: 'crearUsuario',
        component: CrearUsuarioComponent,
      },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
