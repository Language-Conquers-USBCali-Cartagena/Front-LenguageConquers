import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../shared/models/profesor';
import { ProfesorServicesService } from '../services/services.service';
import { Curso } from 'src/app/shared/models/curso';
import { CursoService } from 'src/app/shared/services/curso/curso.service';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.css']
})
export class MenuProfesorComponent implements OnInit {
  cursosCard: Curso[] = [];
  profesor: Profesor = {};
  genero: string ='';
  correo: string ='';
  constructor(private cursoService: CursoService, private profesorService: ProfesorServicesService) {


  }
  async ngOnInit() {
    await this.cargarTarjetasCursos();
    await this.obtenerProfesor();

  }
  cargarTarjetasCursos(){
    this.cursoService.getCurso().subscribe(data =>{
      this.cursosCard = data;
    });
  }

  async obtenerProfesor() {
    let correo = localStorage.getItem("correo")!;
    await this.profesorService.getProfesor(correo).toPromise().then((response) =>{
      localStorage.setItem("usuario", JSON.stringify(response));
      this.profesor = response;
    });
  }

  public capitalizerFirstLetter(str: string) {
    return str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase();
  }
  //TODO:HACER SERVICIO PARA TRAER LOS CURSOS POR DOCENTE


}
