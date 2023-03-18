import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from '../../../shared/models/estudiante';
import { EstudianteServiceService } from '../services/estudiante-service.service';
import { Curso } from '../../../shared/models/curso';
import { CursoService } from 'src/app/shared/services/curso/curso.service';


@Component({
  selector: 'app-tarjetas-cursos',
  templateUrl: './tarjetas-cursos.component.html',
  styleUrls: ['./tarjetas-cursos.component.css']
})
export class TarjetasCursosComponent implements OnInit {

  cursosCard: Curso[] = [];
  estudiante: Estudiante = {};
  cursos?: Curso[];
  correo: string = '';
  curso?:Curso;
  constructor(private estudianteService: EstudianteServiceService,  private cursoService: CursoService) {


   }
  async ngOnInit() {
    this.estudiante = JSON.parse(String(localStorage.getItem('usuario')));
    await this.cargarTarjetasCursos();
    await this.obtenerCursos();
  }


  cargarTarjetasCursos(){
    this.cursoService.getCurso().subscribe(data =>{
      this.cursosCard = data;
    });
  }


  async obtenerCursos(){
    let correo= this.estudiante.correo!;
    await this.estudianteService.getCursos(correo).toPromise().then((response) => {
      this.cursos = response;
    })
  }

  public capitalizerFirstLetter(str: string) {
    return str.charAt(0).toUpperCase()+ str.slice(1).toLowerCase();
  }




}
