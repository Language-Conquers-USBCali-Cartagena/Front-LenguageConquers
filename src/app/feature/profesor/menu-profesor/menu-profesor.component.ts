import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../shared/models/profesor';
import { ProfesorServicesService } from '../services/services.service';
import { Curso } from 'src/app/shared/models/curso';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.css']
})
export class MenuProfesorComponent implements OnInit {

  profesor: Profesor = {};
  cursos?: Curso[];
  correo: string ='';
  idProfesor?: number | undefined = 0;
  cursoSeleccionadoId: number | null = null;
  constructor( private profesorService: ProfesorServicesService, private router: Router) {


  }
  async ngOnInit() {
    await this.obtenerProfesor();
    await this.obtenerCursos();

  }

  async obtenerCursos(){
    await this.profesorService.getCursos(Number(this.idProfesor)).toPromise().then((response) => {
      this.cursos = response;
    })
  }
  async obtenerProfesor() {
    let correo = localStorage.getItem("correo")!;
    await this.profesorService.getProfesor(correo).toPromise().then((response) =>{
      localStorage.setItem("usuario", JSON.stringify(response));
      this.profesor = response;
      this.idProfesor = this.profesor.idProfesor;

    });
  }

  seleccionarCurso(cursoId: number): void {
    this.cursoSeleccionadoId = cursoId;
    this.router.navigate(['/profesor/curso/configuracion-curso/', cursoId]);
  }

  public capitalizerFirstLetter(str: string) {
    return str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase();
  }


}
