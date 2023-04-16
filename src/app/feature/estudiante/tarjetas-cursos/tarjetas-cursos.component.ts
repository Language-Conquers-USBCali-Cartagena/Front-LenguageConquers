import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from '../../../shared/models/estudiante';
import { EstudianteServiceService } from '../services/estudiante-service.service';
import { Curso } from '../../../shared/models/curso';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';
import { CursoEstudiante } from 'src/app/shared/models/cursoEstudiante';
import { CursoEstudianteService } from 'src/app/shared/services/cursoEstudiante/curso-estudiante.service';
import Swal from 'sweetalert2';
import { error } from 'console';
import { RetoEstudiante } from 'src/app/shared/models/retoEstudiante';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { Reto } from 'src/app/shared/models/reto';

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
  cursoEstudiante: CursoEstudiante ={};
  retoEstudiante: RetoEstudiante = {};
  constructor(

    private router: Router,
    private estudianteService: EstudianteServiceService,
    private cursoService: CursoService,
    private cursoEstudianteService: CursoEstudianteService,
    private retoEstudianteService: RetoEstudianteService,
    ) {


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


  registrarCurso(idCurso: number | undefined){
    this.cursoEstudianteService.getCursoEstudiante(this.estudiante.idEstudiante!, idCurso!).subscribe((resp) =>{
      this.router.navigate(['estudiante/curso/mapa', idCurso]);
    }, error => {
      Swal.fire({
      title: '¿Desea registrarse en este curso?',
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      confirmButtonColor: '#31B2C2',
    }).then((result) => {
      if(result.isConfirmed){
        this.cursoEstudiante = {puntaje: 0, nivel: 1, usuarioCreador: 'admin', fechaCreacion: new Date(), idCurso: idCurso, idEstudiante: this.estudiante.idEstudiante!}
        this.retoEstudiante = {idEstado: 1, idEstudiante: this.estudiante.idEstudiante!, fechaCreacion: new Date, idGrupo: 1, idReto: 1,  idRol: 1, intentos: 0, puntaje: 0 , fechaEntrega: new Date, usuarioCreador: "admin"}
        this.cursoEstudianteService.registrarCursoEstudiante(this.cursoEstudiante).subscribe((resp) =>{
          this.retoEstudianteService.crearRetoEstudiante(this.retoEstudiante).subscribe((resp) => {
        this.router.navigate(['estudiante/curso/mapa', idCurso])
          }, error => {
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: error.error
            });
          });
        }, error => {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: error.error
          });
        });
      }
    })
    })
  }
}
