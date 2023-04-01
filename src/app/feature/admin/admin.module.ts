import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticulosComponent } from './articulos/articulos.component';
import { AvatarComponent } from './avatar/avatar.component';
import { CategoriaArticulosComponent } from './categoria-articulos/categoria-articulos.component';
import { CursoComponent } from './curso/curso.component';
import { EstadoComponent } from './estado/estado.component';
import { HomeComponent } from './home/home.component';
import { LogrosComponent } from './logros/logros.component';
import { MisionesComponent } from './misiones/misiones.component';
import { ProgramaComponent } from './programa/programa.component';
import { RetoComponent } from './reto/reto.component';
import { AdminComponent } from './admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../../shared/material/material.module';
import { CoreModule } from "../../core/core.module";
import { CrearRegistrarComponent } from './reto/crear-registrar/crear-registrar.component';
import { CrearModificarMisionComponent } from './misiones/crear-modificar-mision/crear-modificar-mision.component';
import { CrearModificarLogrosComponent } from './logros/crear-modificar-logros/crear-modificar-logros.component';
import { CrearModificarArticulosComponent } from './articulos/crear-modificar-articulos/crear-modificar-articulos.component';
import { CrearModificarCategoriaComponent } from './categoria-articulos/crear-modificar-categoria/crear-modificar-categoria.component';
import { CrearModificarAvatarComponent } from './avatar/crear-modificar-avatar/crear-modificar-avatar.component';
import { CrearModificarEstadoComponent } from './estado/crear-modificar-estado/crear-modificar-estado.component';
import { CrearModificarProgramaComponent } from './programa/crear-modificar-programa/crear-modificar-programa.component';
import { CrearModificarCursoComponent } from './curso/crear-modificar-curso/crear-modificar-curso.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { CrearModificarProfesorComponent } from './profesor/crear-modificar-profesor/crear-modificar-profesor.component';
import { EstudianteComponent } from './estudiante/estudiante.component';
import { CrearModificarEstudianteComponent } from './estudiante/crear-modificar-estudiante/crear-modificar-estudiante.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



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
        ProgramaComponent,
        RetoComponent,
        AdminComponent,
        EstudianteComponent,
        CrearRegistrarComponent,
        CrearModificarMisionComponent,
        CrearModificarLogrosComponent,
        CrearModificarArticulosComponent,
        CrearModificarCategoriaComponent,
        CrearModificarAvatarComponent,
        CrearModificarEstadoComponent,
        CrearModificarProgramaComponent,
        CrearModificarCursoComponent,
        ProfesorComponent,
        CrearModificarProfesorComponent,
        CrearModificarEstudianteComponent

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        CoreModule,
        NgxChartsModule,



    ],schemas: [ CUSTOM_ELEMENTS_SCHEMA ],

})
export class AdminModule { }
