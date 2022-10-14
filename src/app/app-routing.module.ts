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
  {

    path: 'curso',
    loadChildren: ()=>import('./feature/curso/curso.module').then(m => m.CursoModule)
  },
  {
    path: 'logout',
    loadChildren: ()=>import('./feature/logout/logout.module').then(m => m.LogoutModule)
  },
  {
    path: 'tienda',
    loadChildren: ()=>import('./feature/tienda/tienda.module').then(m => m.TiendaModule)
  },
  {
    path: 'ranking',
    loadChildren: ()=>import('./feature/ranking/ranking.module').then(m => m.RankingModule)
  },
  {
    path: 'logros',
    loadChildren: ()=>import('./feature/logros/logros.module').then(m => m.LogrosModule)
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
