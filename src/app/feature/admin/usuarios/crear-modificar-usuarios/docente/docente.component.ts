import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/shared/models/genero';
import { Profesor } from 'src/app/shared/models/profesor';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.component.html',
  styleUrls: ['./docente.component.css']
})
export class DocenteComponent implements OnInit {

  profesor!: Profesor;
  form!: FormGroup;
  generos: Genero[] = [];
  correo: string = '';
  esActualizar: boolean = true;
  hayErrores = false;
  mensajeError: string = "";

  constructor(private fb: FormBuilder, private generoService: GeneroService, private router: Router, private activatedRoute: ActivatedRoute, private profesorService: ProfesorService) {
    this.crearDocente();
  }
/*TODO: REVISAR SI AL FIN VA A QUEDAR LISTADO EN UNA TABLA TANTO PROFESOR COMO ESTUDIANTE*/
  crearDocente() {
    this.form = this.fb.group({
      idProfesor: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      foto:['', Validators.required],
      correo: ['', Validators.required],
      genero: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearDocente();
    this.cargarDocente();
    this.getGenero();
  }
  getGenero() {
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }

  guardarProfesor() {
    const correo = this.form.value.correo;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const foto = this.form.value.foto;
    const usuarioCreador = this.form.value.usuarioCreador;
    const fechaCreacion = new Date();
    const genero = this.form.value.genero.idGenero;
    let profesor: Profesor = { nombre: nombre, apellido: apellido, correo: correo, foto: foto, usuarioCreador: usuarioCreador, fechaCreacion: fechaCreacion, idGenero: genero }

    this.profesorService.crearProfesor(profesor).subscribe(data => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: 'El docente se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/usuarios/listar-usuario']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  setDocente(profesor: Profesor) {
    this.form.setValue({
      idProfesor: profesor.idProfesor,
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      correo: profesor.correo,
      foto: profesor.foto,
      usuarioCreador: profesor.usuarioCreador,
      fechaCreacion: profesor.fechaCreacion,
      usuarioModificador: profesor.usuarioModificador,
      fechaModificacion: profesor.fechaModificacion,
      idGenero: profesor.idGenero
    });
  }


  cargarDocente(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.profesorService.consultarPorId(id).subscribe((data) => {
            this.profesor= data;
            this.setDocente(this.profesor);
          });
        }
      }
    );
  }

  actualizar() {
    const correo = this.form.value.correo;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const foto = this.form.value.foto;
    const usuarioModificador =  this.form.value.usuarioModificador;
    const genero = this.form.value.genero.idGenero;
    let profesor: Profesor = { idProfesor: this.form.value.idProfesor, nombre: nombre, apellido: apellido, correo: correo, foto: foto, usuarioModificador: usuarioModificador, fechaModificacion: new Date(), idGenero: genero }
    this.profesor.idProfesor = this.form.value.idProfesor;
    this.profesorService.actualizarProfesor(profesor).subscribe(() =>{
      //TODO:FALTA AGREGAR MENSAJE
      this.router.navigateByUrl('/admin/usuarios/listar-usuarios');
    });
  }

  atras() {
    this.router.navigateByUrl('/admin/usuarios/listar-usuarios');
  }

}
