import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ArticulosComponent } from './articulos/articulos.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CategoriaArticulosComponent } from './categoria-articulos/categoria-articulos.component';
import { CursoComponent } from './curso/curso.component';
import { EstadoComponent } from './estado/estado.component';
import { HomeComponent } from './home/home.component';
import { LogrosComponent } from './logros/logros.component';
import { MisionesComponent } from './misiones/misiones.component';
import { MonedasComponent } from './monedas/monedas.component';
import { NivelMisionComponent } from './nivel-mision/nivel-mision.component';
import { ProgramaComponent } from './programa/programa.component';
import { RetoComponent } from './reto/reto.component';
import { TipoMisionComponent } from './tipo-mision/tipo-mision.component';
import { UsuariosComponent } from './usuarios/usuarios.component';


const routes: Routes = [

    {
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path:'',
                redirectTo:'home',
                pathMatch:'full'
            },
            {
                path: 'articulos',
                component: ArticulosComponent
            },
            {
                path: 'avatar',
                component: AvatarComponent
            },
            {
                path: 'categoria-articulos',
                component: CategoriaArticulosComponent
            },
            {
                path: 'curos',
                component: CursoComponent
            },
            {
                path: 'estado',
                component: EstadoComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'logros',
                component: LogrosComponent
            },
            {
                path: 'misiones',
                component: MisionesComponent
            },
            {
                path: 'monedas',
                component: MonedasComponent
            },
            {
                path: 'nivel-mision',
                component: NivelMisionComponent
            },
            {
                path: 'programa',
                component: ProgramaComponent
            },
            {
                path: 'reto',
                component: RetoComponent
            },
            {
                path: 'tipo-mision',
                component: TipoMisionComponent
            },
            {
                path: 'usuario',
                component: UsuariosComponent
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { } 