import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';


const routes: Routes = [{
  path:'',
  component:SidebarComponent,
  children:[
     {
      path:'urlprueba',
      component:SidebarComponent, 
     }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontRoutingModule { }
