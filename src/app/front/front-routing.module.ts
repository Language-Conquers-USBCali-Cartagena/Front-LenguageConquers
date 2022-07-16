import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuProfesorComponent } from './menu-profesor/menu-profesor.component';
import { ProfesorComponent } from './profesor/profesor.component';



const routes: Routes = [{
  path:'',
  component:ProfesorComponent,
  children:[
     {
       
      path:'menu/prueba',
      component:MenuProfesorComponent,
     }
  ]
}];



  
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
