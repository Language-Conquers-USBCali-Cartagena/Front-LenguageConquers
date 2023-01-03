import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: UntypedFormGroup;
  hide = true;
  curso!: Curso;
  profesores :Profesor[] = [];
  estados:Estado[] = [];

  constructor(private fb: UntypedFormBuilder, private estadoService: EstadoService,private profesorService: ProfesorService, private router:Router, private cursoService: CursoService,  private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      password: ['', Validators.required],
      cantidadEstudiantes: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      progreso: ['', Validators.required],
      profesor: ['', Validators.required],
      estado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.getProfesor();
    this.getEstado();
  }
  getProfesor() {
    this.profesorService.getProfesor().subscribe(resp =>this.profesores = resp);
  }

  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  crearCurso(){
    const nombre = this.form.value.nombre;
    const password = this.form.value.password;
    const cantidadEstudiantes = this.form.value.cantidadEstudiantes;
    const fechaInicio: Date = this.form.value.fechaInicio;
    const fechaFin: Date = this.form.value.fechaFin;
    const progreso = this.form.value.progreso;
    const estado= this.form.value.estado.idEstado;
    const profesor = this.form.value.profesor.idProfesor;
    const usuarioCreador = this.form.value.usuarioCreador;
    let curso: Curso = {nombre: nombre, password: password, cantidadEstudiantes: cantidadEstudiantes,inicioCurso: fechaInicio, finCurso: fechaFin, progreso: progreso, idEstado: estado, idProfesor: profesor, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Curso se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  setCurso(curso: Curso) {
    this.form.setValue({
      nombre: curso.nombre,
      password: curso.password,
      cantidadEstudiantes: curso.cantidadEstudiantes,
      fechaInicio: curso.inicioCurso,
      fechaFin: curso.finCurso,
      progreso: curso.progreso,
      estado: curso.idEstado,
      profesor: curso.idProfesor,
      usuarioCreador: curso.usuarioCreador,
      usuarioModificador: curso.usuarioModificador
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


  atras(){
    this.router.navigateByUrl('/admin/cursos/listar-cursos');
  }


}
