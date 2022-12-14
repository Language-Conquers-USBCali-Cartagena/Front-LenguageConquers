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

    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        MaterialModule,
        CoreModule
    ]
})
export class AdminModule { }
