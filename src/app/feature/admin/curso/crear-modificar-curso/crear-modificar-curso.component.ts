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
    const estado = this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let curso: Curso = {
      nombre:  this.form.value.nombre,
      password: this.form.value.password,
      cantidadEstudiantes: this.form.value.cantidadEstudiantes,
      inicioCurso: this.form.value.inicioCurso,
      finCurso: this.form.value.finCurso,
      progreso: 0,
      idEstado: estado.idEstado,
      idProfesor: profesor.idProfesor,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: fechaActual}
    this.cursoService.crearCurso(curso).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/cursos/listar-cursos']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
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
    const estado= this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let curso: Curso = {
      idCurso:this.curso.idCurso,
      nombre: this.form.value.nombre,
      password: this.form.value.password,
      cantidadEstudiantes: this.form.value.cantidadEstudiantes,
      inicioCurso: this.form.value.inicioCurso,
      finCurso: this.form.value.finCurso,
      progreso: this.form.value.progreso,
      idEstado: estado.idEstado,
      idProfesor: profesor.idProfesor,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: fechaActual,
      fechaCreacion: this.curso.fechaCreacion,
      usuarioCreador: this.curso.usuarioCreador}
    this.cursoService.actualizarCurso(curso).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/cursos/listar-cursos']);
    }, (e) => {
      this.hayErrores = true;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }


  atras(){
    this.router.navigateByUrl('/admin/cursos/listar-cursos');
  }


}
