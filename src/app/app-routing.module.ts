import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'auth'
  },
  {
    path: 'auth',
    loadChildren:() => import('./feature/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'estudiante',
    loadChildren: ()=>import('./feature/estudiante/estudiante.module').then(m => m.EstudianteModule)
  },
  {
    path: 'profesor',
    loadChildren: ()=>import('./feature/profesor/profesor.module').then(m => m.ProfesorModule)
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
