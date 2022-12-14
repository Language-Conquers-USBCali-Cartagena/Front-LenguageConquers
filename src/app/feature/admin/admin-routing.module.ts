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
import { CrearModificarMisionComponent } from './misiones/crear-modificar-mision/crear-modificar-mision.component';
import { MisionesComponent } from './misiones/misiones.component';
import { MonedasComponent } from './monedas/monedas.component';
import { NivelMisionComponent } from './nivel-mision/nivel-mision.component';
import { ProgramaComponent } from './programa/programa.component';
import { CrearRegistrarComponent } from './reto/crear-registrar/crear-registrar.component';
import { RetoComponent } from './reto/reto.component';
import { TipoMisionComponent } from './tipo-mision/tipo-mision.component';
import { DocenteComponent } from './usuarios/crear-modificar-usuarios/docente/docente.component';
import { EstudianteComponent } from './usuarios/crear-modificar-usuarios/estudiante/estudiante.component';
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
                path: 'articulos/listar-articulos',
                component: ArticulosComponent
            },
            {
                path: 'avatar/listar-avatar',
                component: AvatarComponent
            },
            {
                path: 'categoria-articulos/listar',
                component: CategoriaArticulosComponent
            },
            {
                path: 'curos/listar-cursos',
                component: CursoComponent
            },
            {
                path: 'estado/listar-estados',
                component: EstadoComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: 'logros/listar-logros',
                component: LogrosComponent
            },
            {
                path: 'misiones/listar-misiones',
                component: MisionesComponent
            },
            {
                path: 'misiones/creaMisiones',
                component: CrearModificarMisionComponent,
            },
            {
                path: 'monedas/listar-monedas',
                component: MonedasComponent
            },
            {
                path: 'nivel-mision/listar',
                component: NivelMisionComponent
            },
            {
                path: 'programa/listar-programa',
                component: ProgramaComponent
            },
            {
                path: 'reto/listar-retos',
                component: RetoComponent
            },
            {
                path: 'reto/crearReto',
                component:CrearRegistrarComponent,
            },
            {
                path: 'tipo-mision/listar',
                component: TipoMisionComponent
            },
            {
                path: 'usuarios/listar-usuarios',
                component: UsuariosComponent,
            },
            {
              path: 'usuarios/crearDocente',
              component: DocenteComponent
            },
            {
              path: 'usuarios/crearEstudiante',
              component: EstudianteComponent
            },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class AdminRoutingModule { }
