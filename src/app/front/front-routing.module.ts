import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioProfesorComponent } from './inicio-profesor/inicio-profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorComponent } from './profesor/profesor.component';



const routes: Routes = [{
  path:'',
  component:InicioProfesorComponent,
  children:[
     {
      path:'menu',
      component:MenuProfesorComponent
     },
     {
      path: 'inicio', 
      component:InicioProfesorComponent
     }
        
  ]
}];



  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
