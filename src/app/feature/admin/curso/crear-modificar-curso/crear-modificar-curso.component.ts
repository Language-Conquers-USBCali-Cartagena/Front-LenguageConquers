import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Profesor } from 'src/app/shared/models/profesor';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';
import { ProfesorService } from '../../../../shared/services/profesor/profesor.service';
import { CursoService } from 'src/app/shared/services/curso/curso.service';

@Component({
  selector: 'app-crear-modificar-curso',
  templateUrl: './crear-modificar-curso.component.html',
  styleUrls: ['./crear-modificar-curso.component.css']
})
export class CrearModificarCursoComponent implements OnInit {

  form!: FormGroup;
  hide = true;
  curso!: Curso;
  profesores :Profesor[] = [];
  estados:Estado[] = [];
  hayErrores = false;
  mensajeError: string="";


  constructor(private fb: FormBuilder, private estadoService: EstadoService,private profesorService: ProfesorService, private router:Router, private cursoService: CursoService,  private activatedRoute: ActivatedRoute) {
    this.crearCurso();
   }

   crearCurso(){
    this.form = this.fb.group({
      idCurso: ['', Validators.required],
      nombre:  ['', Validators.required],
      password: ['', Validators.required],
      cantidadEstudiantes: ['', Validators.required],
      inicioCurso: ['', Validators.required],
      finCurso: ['', Validators.required],
      progreso: ['', Validators.required],
      idProfesor: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.getProfesor();
    this.getEstado();
    this.crearCurso();
    this.cargarCurso();
  }
  getProfesor() {
    this.profesorService.getProfesor().subscribe(resp =>this.profesores = resp);

  }

  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  guardarCurso(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const password = this.form.value.password;
    const cantidadEstudiantes = this.form.value.cantidadEstudiantes;
    const fechaInicio: Date = this.form.value.inicioCurso;
    const fechaFin: Date = this.form.value.finCurso;
    const estado = this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const usuarioCreador = this.form.value.usuarioCreador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let curso: Curso = {nombre: nombre, password: password, cantidadEstudiantes: cantidadEstudiantes,inicioCurso: fechaInicio, finCurso: fechaFin, progreso: 0, idEstado: estado.idEstado, idProfesor: profesor.idProfesor, usuarioCreador: usuarioCreador,
                                  fechaCreacion: fechaActual}
    this.cursoService.crearCurso(curso).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/cursos/listar-cursos']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      console.log(this.mensajeError);

      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  setCurso(curso: Curso) {
    this.form.setValue({
      idCurso: curso.idCurso,
      nombre: curso.nombre,
      password: curso.password,
      cantidadEstudiantes: curso.cantidadEstudiantes,
      inicioCurso: curso.inicioCurso,
      finCurso: curso.finCurso,
      progreso: curso.progreso,
      idEstado: curso.idEstado,
      idProfesor: curso.idProfesor,
      usuarioCreador: curso.usuarioCreador,
      fechaCreacion: curso.fechaCreacion,
      usuarioModificador: curso.usuarioModificador,
      fechaModificacion: curso.fechaModificacion
    });
  }

  cargarCurso(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.cursoService.consultarPorId(id).subscribe((data) => {
            this.curso = data;
            this.setCurso(this.curso);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const password = this.form.value.password;
    const cantidadEstudiantes = this.form.value.cantidadEstudiantes;
    const fechaInicio: Date = this.form.value.inicioCurso;
    const fechaFin: Date = this.form.value.finCurso;
    const progreso = this.form.value.progreso;
    const estado= this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const usuarioModificador = this.form.value.usuarioModificador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let curso: Curso = {idCurso:this.curso.idCurso,nombre: nombre, password: password, cantidadEstudiantes: cantidadEstudiantes,inicioCurso: fechaInicio, finCurso: fechaFin, progreso: progreso, idEstado: estado.idEstado, idProfesor: profesor.idProfesor, usuarioModificador: usuarioModificador,
                                  fechaModificacion: fechaActual, fechaCreacion: this.curso.fechaCreacion, usuarioCreador: this.curso.usuarioCreador}
    this.cursoService.actualizarCurso(curso).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/cursos/listar-cursos']);
    }, (e) => {
      this.hayErrores = true;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


  atras(){
    this.router.navigateByUrl('/admin/cursos/listar-cursos');
  }


}
