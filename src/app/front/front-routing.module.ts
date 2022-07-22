import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioEstudianteComponent } from './inicio-estudiante/inicio-estudiante.component';
import { InicioProfesorComponent } from './inicio-profesor/inicio-profesor.component';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { VistaComponent } from './vista/vista.component';



const routes: Routes = [{
  path:'',
  component:VistaComponent,
  children:[
     {
      path:'menu',
      component:ProfesorComponent
     },
     {
      path: 'inicio', 
      component:InicioProfesorComponent
     },
     {
      path: 'inicioes', 
      component:InicioEstudianteComponent
     },
        
  ]
}];



  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
