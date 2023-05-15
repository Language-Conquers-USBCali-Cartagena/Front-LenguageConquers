import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../shared/models/profesor';
import { ProfesorServicesService } from '../services/services.service';
import { Curso } from 'src/app/shared/models/curso';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
      if(response.length == 0){
        Swal.fire({
          icon: 'warning',
          title: 'Sin cursos asignados',
          text: 'Usted todavia no tiene cursos asignados, por favor comuniquese con el administrador de la plataforma: languageconquersusb22@gmail.com',
          confirmButtonColor: '#31B2C2',
        });
      }else{
        this.cursos = response;
      }

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
