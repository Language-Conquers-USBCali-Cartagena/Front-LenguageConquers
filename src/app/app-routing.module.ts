import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'menuPrincipal'
  },
  {
    path: 'auth',
    loadChildren:() => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'menuPrincipal',
    loadChildren: () => import('./pagina-principal/pagina-principal.module').then(m => m.PaginaPrincipalModule)
  },
  {
    path: '**',
    redirectTo: 'auth'
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
