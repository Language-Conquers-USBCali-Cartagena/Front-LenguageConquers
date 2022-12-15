import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CoreModule } from "../../core/core.module";
import { DocenteComponent } from './usuarios/crear-modificar-usuarios/docente/docente.component';
import { EstudianteComponent } from './usuarios/crear-modificar-usuarios/estudiante/estudiante.component';
import { CrearRegistrarComponent } from './reto/crear-registrar/crear-registrar.component';
import { CrearModificarMisionComponent } from './misiones/crear-modificar-mision/crear-modificar-mision.component';
import { CrearModificarNivelMisionComponent } from './nivel-mision/crear-modificar-nivel-mision/crear-modificar-nivel-mision.component';
import { CrearModificarTipoMisionComponent } from './tipo-mision/crear-modificar-tipo-mision/crear-modificar-tipo-mision.component';
import { CrearModificarLogrosComponent } from './logros/crear-modificar-logros/crear-modificar-logros.component';
import { CrearModificarArticulosComponent } from './articulos/crear-modificar-articulos/crear-modificar-articulos.component';
import { CrearModificarCategoriaComponent } from './categoria-articulos/crear-modificar-categoria/crear-modificar-categoria.component';
import { CrearModificarAvatarComponent } from './avatar/crear-modificar-avatar/crear-modificar-avatar.component';
import { CreaModificarMonedasComponent } from './monedas/crea-modificar-monedas/crea-modificar-monedas.component';
import { CrearModificarEstadoComponent } from './estado/crear-modificar-estado/crear-modificar-estado.component';
import { CrearModificarProgramaComponent } from './programa/crear-modificar-programa/crear-modificar-programa.component';
import { CrearModificarCursoComponent } from './curso/crear-modificar-curso/crear-modificar-curso.component';



@NgModule({
    declarations: [
        ArticulosComponent,
        AvatarComponent,
        CategoriaArticulosComponent,
        CursoComponent,
        EstadoComponent,
        HomeComponent,
        LogrosComponent,
        MisionesComponent,
        MonedasComponent,
        NivelMisionComponent,
        ProgramaComponent,
        RetoComponent,
        TipoMisionComponent,
        UsuariosComponent,
        AdminComponent,
        DocenteComponent,
        EstudianteComponent,
        CrearRegistrarComponent,
        CrearModificarMisionComponent,
        CrearModificarNivelMisionComponent,
        CrearModificarTipoMisionComponent,
        CrearModificarLogrosComponent,
        CrearModificarArticulosComponent,
        CrearModificarCategoriaComponent,
        CrearModificarAvatarComponent,
        CreaModificarMonedasComponent,
        CrearModificarEstadoComponent,
        CrearModificarProgramaComponent,
        CrearModificarCursoComponent,

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        CoreModule
    ]
})
export class AdminModule { }
