import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Genero } from 'src/app/shared/models/genero';
import { Profesor } from 'src/app/shared/models/profesor';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';
import { ProfesorServicesService } from '../services/services.service';
import { GeneroService } from 'src/app/shared/services/genero/genero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, ref, uploadBytes , Storage} from '@angular/fire/storage';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil-profesor',
  templateUrl: './perfil-profesor.component.html',
  styleUrls: ['./perfil-profesor.component.css']
})
export class PerfilProfesorComponent implements OnInit {

  profesor: Profesor = {};
  generos: Genero[] = [];
  form!: FormGroup;
  hayErrores = false;
  mensajeError: string="";
  correo: string = '';
  idGenero: number | undefined = 0;
  genero!: string;
  usuario!: Profesor;
  idProfesor: number | undefined;
  nombreGenero: string | undefined;
  imagenUrl: string = "";


  constructor(private storage: Storage, private profesorService: ProfesorService, private profesorServiceService: ProfesorServicesService,
    private fb: FormBuilder, private generoService: GeneroService,private router:Router, private activatedRoute: ActivatedRoute) {
      this.crearProfesor();
     }

  ngOnInit(): void {
    this.crearProfesor();
    this.obtenerProfesor();
    this.getGenero();
    this.setGenero();
  }

  obtenerProfesor(){
    let usuarioResp: Profesor = JSON.parse(String(localStorage.getItem("usuario")));
    this.setProfesor(usuarioResp);
    this.idGenero = usuarioResp.idGenero;
  }

  crearProfesor(){
    this.form = this.fb.group({
      idProfesor: ['', Validators.required],
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', Validators.required],
      foto: ['', Validators.required],
      idGenero: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  getGenero(){
    this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  setGenero(){
    this.generoService.consultarPorId(this.idGenero!).subscribe(data => {
      this.nombreGenero = data.genero;
      this.genero = this.nombreGenero ?? "";
    });
  }

  setProfesor(profesor: Profesor){
    this.form = this.fb.group({
      idProfesor: profesor.idProfesor,
      nombre: profesor.nombre,
      apellido: profesor.apellido,
      correo: profesor.correo,
      foto: profesor.foto,
      usuarioCreador: profesor.usuarioCreador,
      fechaCreacion: profesor.fechaCreacion,
      usuarioModificador: profesor.usuarioModificador,
      fechaModificacion: profesor.fechaModificacion
    });
  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `docente/${file.name}`);
    uploadBytes(imagenReferencia,file,{contentType:'image/png'}).then(
      response =>{
        getDownloadURL(imagenReferencia).then(downloadURL =>{
          this.imagenUrl = downloadURL;
        });
      }).catch(error =>{
        Swal.fire({
          icon:'error',
          title: 'Oops...',
          text: error
        });
      });
  }

  cargarProfesor() {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if (id) {
          this.profesorService.consultarPorId(id).subscribe((data) => {
            this.profesor = data;
            this.setProfesor(this.profesor);
          });
        }
      }
    );
  }

  actualizar() {
    const correo = this.form.value.correo;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const foto = this.imagenUrl;
    const usuarioModificador = this.form.value.nombre + this.form.value.apellido;
    const genero = this.form.value.idGenero;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let profesor: Profesor = {
      idProfesor: this.form.value.idProfesor, nombre: nombre, apellido: apellido,
      correo: correo, foto: foto, usuarioModificador: usuarioModificador, fechaModificacion: fechaActual, idGenero: genero.idGenero,
      usuarioCreador: this.profesor.usuarioCreador, fechaCreacion: this.profesor.fechaCreacion
    }
    this.profesorService.actualizarProfesor(profesor).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }


}
