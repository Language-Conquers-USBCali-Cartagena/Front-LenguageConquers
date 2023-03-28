import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Genero } from 'src/app/shared/models/genero';
import { Profesor } from 'src/app/shared/models/profesor';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';
import Swal from 'sweetalert2';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Component({
  selector: 'app-crear-modificar-profesor',
  templateUrl: './crear-modificar-profesor.component.html',
  styleUrls: ['./crear-modificar-profesor.component.css']
})
export class CrearModificarProfesorComponent implements OnInit {

  profesor!: Profesor;
  form!: FormGroup;
  generos: Genero[] = [];
  correo: string = '';
  esActualizar: boolean = true;
  hayErrores = false;
  mensajeError: string = "";
  imagenUrl: string = "";
  actualizarFoto: string = 'no';
  nombreGenero: string| undefined ;

  constructor(private storage: Storage, private fb: FormBuilder, private generoService: GeneroService, private router: Router, private activatedRoute: ActivatedRoute, private profesorService: ProfesorService) {
    this.crearDocente();
  }

  crearDocente() {
    this.form = this.fb.group({
      idProfesor: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      foto: ['', Validators.required],
      correo: ['', Validators.required],
      idGenero: ['', Validators.required],
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
  setGenero(idGenero: number) {
    this.generoService.consultarPorId(idGenero!).subscribe(data => {
      this.nombreGenero = data.genero;
    });
  }

  guardarProfesor() {
    const genero = this.form.value.idGenero;
    const generoSeleccionado = this.generos.find(e => e.idGenero == genero);
    const idGenero = Number(generoSeleccionado?.idGenero ?? "");
    let profesor: Profesor = {
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      foto: this.imagenUrl,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date(),
      idGenero: idGenero }
    this.profesorService.crearProfesor(profesor).subscribe(data => {
      if (data) {
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/profesor/listar-profesores']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
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


  cargarDocente() {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.profesorService.consultarPorId(id).subscribe((data) => {
            this.profesor = data;
            this.setDocente(this.profesor);
          });
        }
      }
    );
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `docente/${file.name}`);
    uploadBytes(imagenReferencia, file, { contentType: 'image/png' }).then(
      response => {
        getDownloadURL(imagenReferencia).then(downloadURL => {
          this.imagenUrl = downloadURL;
        });
      }).catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error
        });
      });
  }

  actualizar() {
    const fotoNueva = this.imagenUrl;
    const genero = this.form.value.idGenero;
    const generoSeleccionado = this.generos.find(e => e.idGenero == genero);
    const idGenero = Number(generoSeleccionado?.idGenero ?? "");
    const fotoVieja = this.profesor.foto;
    let profesor: Profesor = {
      idProfesor: this.form.value.idProfesor,
      nombre: this.form.value.nombre,
      apellido: this.form.value.apellido,
      correo: this.form.value.correo,
      foto: fotoNueva ? fotoNueva : fotoVieja,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: new Date(),
      idGenero: idGenero,
      usuarioCreador: this.profesor.usuarioCreador,
      fechaCreacion: this.profesor.fechaCreacion
    }
    this.profesorService.actualizarProfesor(profesor).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl('/admin/profesor/listar-profesores');
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });

  }


  atras() {
    this.router.navigateByUrl('/admin/profesor/listar-profesores');
  }


}
