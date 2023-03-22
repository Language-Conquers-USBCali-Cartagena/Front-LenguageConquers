import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/shared/models/articulos';
import { Categorias } from 'src/app/shared/models/categoria';
import { Estado } from 'src/app/shared/models/estado';
import { CategoriaService } from 'src/app/shared/services/categoria/categoria.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';
import { ArticuloService } from '../../../../shared/services/articulo/articulo.service';
import { ref, uploadBytesResumable, Storage, getDownloadURL, list, uploadBytes } from '@angular/fire/storage';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-crear-modificar-articulos',
  templateUrl: './crear-modificar-articulos.component.html',
  styleUrls: ['./crear-modificar-articulos.component.css']
})
export class CrearModificarArticulosComponent implements OnInit {

  form!: FormGroup;
  categorias: Categorias[] = [];
  estados:Estado[] = [];
  articulo!:Articulo;
  hayErrores: boolean = false;
  mensajeError: any;
  imagenUrl: string = "";
  actualizarFoto: string = 'no';
  isFile: boolean = false;
  isURL: boolean = false;
  porcentajeSubida!:number;


  constructor(private storage: Storage, private fb: FormBuilder, private categoriaService: CategoriaService, private estadoService: EstadoService,private router:Router,  private activatedRoute: ActivatedRoute, private articuloService: ArticuloService) {
    this.crearArticulo();
   }

   crearArticulo(){
    this.form = this.fb.group({
      idArticulo:['', Validators.required],
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      nivelValido: ['', Validators.required],
      imagen: ['', Validators.required],
      idCategoria: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.crearArticulo();
    this.cargarArticulo();
    this.getCategoria();
    this.getEstado();
  }
  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }
  getCategoria(){
    this.categoriaService.getCategoria().subscribe(resp => this.categorias = resp)
  }
  guardarArticulo(){
    const estado= this.form.value.idEstado;
    const categoria = this.form.value.idCategoria;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let articulo: Articulo = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      nivelValido: this.form.value.nivelValido,
      imagen: this.imagenUrl,
      idEstado: estado.idEstado,
      idCategoria: categoria.idCategoria,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: fechaActual}
    this.articuloService.crearArticulo(articulo).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/articulos/listar-articulos']);
      }
    },(e) =>{
      this.hayErrores = true;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });

  }

  uploadImage($event: any) {
    const file = $event.target.files[0];
    console.log(file);
    const imagenReferencia = ref(this.storage, `articulos/${file.name}`);
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

  setArticulo(articulo: Articulo) {
    this.form.setValue({
      idArticulo: articulo.idArticulo,
      nombre: articulo.nombre,
      descripcion: articulo.descripcion,
      precio: articulo.precio,
      nivelValido: articulo.nivelValido,
      imagen: articulo.imagen,
      idEstado: articulo.idEstado,
      idCategoria: articulo.idCategoria,
      usuarioCreador: articulo.usuarioCreador,
      fechaCreacion: articulo.fechaCreacion,
      usuarioModificador: articulo.usuarioModificador,
      fechaModificacion: articulo.fechaModificacion
    });
  }

  cargarArticulo(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.articuloService.consultarPorId(id).subscribe((data) => {
            this.articulo = data;
            this.setArticulo(this.articulo);
          });
        }
      }
    );
  }

  actualizar():void{
    const imagenArticuloNueva = this.imagenUrl;
    const estado = this.form.value.idEstado;
    const categoria = this.form.value.idCategoria;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    const imagenVieja = this.articulo.imagen;
    let articulo: Articulo = {
      idArticulo:this.form.value.idArticulo,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      nivelValido: this.form.value.nivelValido,
      imagen: imagenArticuloNueva ? imagenArticuloNueva: imagenVieja,
      idEstado: estado.idEstado,
      idCategoria: categoria.idCategoria,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: fechaActual,
      usuarioCreador: this.articulo.usuarioCreador,
      fechaCreacion: this.articulo.fechaCreacion}
    this.articuloService.actualizarArticulo(articulo).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/articulos/listar-articulos']);
    },(e) =>{
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(this.mensajeError);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }

  atras(){
    this.router.navigateByUrl('/admin/articulos/listar-articulos');
  }


}
