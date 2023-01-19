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
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      progreso: ['', Validators.required],
      profesor: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.crearCurso();
    this.cargarCurso();
    this.getProfesor();
    this.getEstado();
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
    const fechaInicio: Date = this.form.value.fechaInicio;
    const fechaFin: Date = this.form.value.fechaFin;
    const progreso = this.form.value.progreso;
    const estado= this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const usuarioCreador = this.form.value.usuarioCreador;
    let curso: Curso = {nombre: nombre, password: password, cantidadEstudiantes: cantidadEstudiantes,inicioCurso: fechaInicio, finCurso: fechaFin, progreso: progreso, idEstado: estado, idProfesor: profesor, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.cursoService.crearCurso(curso).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El curso se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;

      Swal.fire({
        icon: 'error',
        title: e.error,
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
      fechaInicio: curso.inicioCurso,
      fechaFin: curso.finCurso,
      progreso: curso.progreso,
      idEstado: curso.idEstado,
      profesor: curso.idProfesor,
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
    const fechaInicio: Date = this.form.value.fechaInicio;
    const fechaFin: Date = this.form.value.fechaFin;
    const progreso = this.form.value.progreso;
    const estado= this.form.value.idEstado;
    const profesor = this.form.value.idProfesor;
    const usuarioModificador = this.form.value.usuarioModificador;
    let curso: Curso = {idCurso:this.form.value.idCurso ,nombre: nombre, password: password, cantidadEstudiantes: cantidadEstudiantes,inicioCurso: fechaInicio, finCurso: fechaFin, progreso: progreso, idEstado: estado, idProfesor: profesor, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date()}
    this.cursoService.actualizarCurso(curso).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El curso se ha actualizado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/cursos/listar-cursos']);
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
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
