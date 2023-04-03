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
import { ProgramaComponent } from './programa/programa.component';
import { CrearRegistrarComponent } from './reto/crear-registrar/crear-registrar.component';
import { RetoComponent } from './reto/reto.component';
import { CrearModificarLogrosComponent } from './logros/crear-modificar-logros/crear-modificar-logros.component';
import { CrearModificarArticulosComponent } from './articulos/crear-modificar-articulos/crear-modificar-articulos.component';
import { CrearModificarCategoriaComponent } from './categoria-articulos/crear-modificar-categoria/crear-modificar-categoria.component';
import { CrearModificarAvatarComponent } from './avatar/crear-modificar-avatar/crear-modificar-avatar.component';
import { CrearModificarEstadoComponent } from './estado/crear-modificar-estado/crear-modificar-estado.component';
import { CrearModificarProgramaComponent } from './programa/crear-modificar-programa/crear-modificar-programa.component';
import { CrearModificarCursoComponent } from './curso/crear-modificar-curso/crear-modificar-curso.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CrearModificarEstudianteComponent } from './estudiante/crear-modificar-estudiante/crear-modificar-estudiante.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { CrearModificarProfesorComponent } from './profesor/crear-modificar-profesor/crear-modificar-profesor.component';
import { AuthGuardGuard } from 'src/app/core/guards/authGuard.guard';
import { AdministradorGuard } from 'src/app/core/guards/administrador.guard';


const routes: Routes = [

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdministradorGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'articulos/listar-articulos',
        component: ArticulosComponent
      },
      {
        path: 'articulos/crearArticulo',
        component: CrearModificarArticulosComponent,
      },
      {
        path: 'articulos/editarArticulo/:id',
        component: CrearModificarArticulosComponent,
      },
      {
        path: 'avatar/listar-avatar',
        component: AvatarComponent
      },
      {
        path: 'avatar/crearAvatar',
        component: CrearModificarAvatarComponent,
      },
      {
        path: 'avatar/editarAvatar/:id',
        component: CrearModificarAvatarComponent,
      },
      {
        path: 'categoria-articulos/listar',
        component: CategoriaArticulosComponent
      },
      {
        path: 'categoria-articulos/crearCategoria',
        component: CrearModificarCategoriaComponent,
      },
      {
        path: 'categoria-articulos/actualizarCategoria/:id',
        component: CrearModificarCategoriaComponent,
      },
      {
        path: 'cursos/listar-cursos',
        component: CursoComponent
      },
      {
        path: 'cursos/crearCurso',
        component: CrearModificarCursoComponent
      },
      {
        path: 'cursos/editarCurso/:id',
        component: CrearModificarCursoComponent
      },
      {
        path: 'estado/listar-estados',
        component: EstadoComponent
      },
      {
        path: 'estado/crearEstado',
        component: CrearModificarEstadoComponent,
      },
      {
        path: 'estado/editarEstado/:id',
        component: CrearModificarEstadoComponent,
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
        path: 'logros/Crearlogros',
        component: CrearModificarLogrosComponent,
      },
      {
        path: 'logros/editarLogro/:id',
        component: CrearModificarLogrosComponent,
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
        path: 'misiones/editarMision/:id',
        component: CrearModificarMisionComponent,
      },
      {
        path: 'programa/listar-programa',
        component: ProgramaComponent
      },
      {
        path: 'programa/crearPrograma',
        component: CrearModificarProgramaComponent,
      },
      {
        path: 'programa/editarPrograma/:id',
        component: CrearModificarProgramaComponent,
      },
      {
        path: 'reto/listar-retos',
        component: RetoComponent
      },
      {
        path: 'reto/crearReto',
        component: CrearRegistrarComponent,
      },
      {
        path: 'reto/editarReto/:id',
        component: CrearRegistrarComponent,
      },
      {
        path: 'estudiante/listar-estudiantes',
        component: EstudianteComponent,
      },
      {
        path: 'estudiante/crearEstudiante',
        component: CrearModificarEstudianteComponent,
      },
      {
        path: 'estudiante/actualizarEstudiante/:id',
        component: CrearModificarEstudianteComponent
      },
      {
        path: 'profesor/listar-profesores',
        component: ProfesorComponent,
      },
      {
        path: 'profesor/actualizarProfesor/:id',
        component: CrearModificarProfesorComponent,
      },
      {
        path: 'profesor/crearProfesor',
        component: CrearModificarProfesorComponent,
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
