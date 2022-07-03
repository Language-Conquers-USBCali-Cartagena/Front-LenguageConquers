import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'menuPrincipal'
  },
  {
    path: 'auth',
    loadChildren:() => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'menuPrincipal',
    loadChildren: () => import('./feature/pagina-principal/pagina-principal.module').then(m => m.PaginaPrincipalModule)
  },
  // {
  //   path: '**',
  //   redirectTo: 'auth'
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
