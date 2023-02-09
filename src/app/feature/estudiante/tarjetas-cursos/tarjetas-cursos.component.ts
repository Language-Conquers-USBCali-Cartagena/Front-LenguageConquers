import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from '../../../shared/models/estudiante';
import { EstudianteServiceService } from '../services/estudiante-service.service';
import { Curso } from '../../../shared/models/curso';
import { CursosCards } from 'src/app/shared/models/cardCursos';
import { CursosCardsService } from '../services/cursos-cards.service';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import Swal from 'sweetalert2';

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
  constructor(private estudianteService: EstudianteServiceService, private cardsCursos:CursosCardsService, private cursoService: CursoService,  private activateRouter: ActivatedRoute) {


   }
  ngOnInit(): void {
    this.cargarTarjetasCursos();
    this.correo = localStorage.getItem("correo")!;
    this.obtenerEstudiante(this.correo);
    this.obtenerCursos(this.correo);
  }


  cargarTarjetasCursos(){
    this.cursoService.getCurso().subscribe(data =>{
      this.cursosCard = data;
    });
  }

  async obtenerEstudiante(correo: string) {
    await this.estudianteService.getEstudiante(correo).toPromise().then((response) => {
      localStorage.setItem("usuario", JSON.stringify(response));
      this.estudiante = response;
    }
    )

  }

  async obtenerCursos(correo: string){
    await this.estudianteService.getCursos(correo).toPromise().then((response) => {
      this.cursos = response;
    })
  }

  



}
