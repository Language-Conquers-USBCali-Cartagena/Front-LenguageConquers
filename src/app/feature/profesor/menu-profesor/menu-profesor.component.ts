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
    this.profesor = JSON.parse(String(localStorage.getItem('usuario')));
    await this.obtenerCursos();

  }

  async obtenerCursos(){
    await this.profesorService.getCursos(Number(this.profesor.idProfesor)).toPromise().then((response) => {
      this.cursos = response;
    })
  }

  seleccionarCurso(cursoId: number): void {
    this.cursoSeleccionadoId = cursoId;
    this.router.navigate(['/profesor/curso/', cursoId]);
  }

  public capitalizerFirstLetter(str: string) {
    return str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase();
  }


}
