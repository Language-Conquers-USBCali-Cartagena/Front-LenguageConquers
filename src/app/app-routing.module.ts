import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankingComponent } from './shared/features/ranking/ranking.component';

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
    path:'ranking', component: RankingComponent
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
