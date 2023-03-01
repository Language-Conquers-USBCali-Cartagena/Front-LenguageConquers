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
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const precio = this.form.value.precio;
    const nivelValido = this.form.value.nivelValido;
    const imagen = this.imagenUrl;
    const estado= this.form.value.idEstado;
    const categoria = this.form.value.idCategoria;
    const usuarioCreador = this.form.value.usuarioCreador;
    let articulo: Articulo = {nombre: nombre, descripcion: descripcion, precio: precio,  nivelValido: nivelValido, imagen: imagen, idEstado: estado.idEstado, idCategoria: categoria.idCategoria, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.articuloService.crearArticulo(articulo).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/articulos/listar-articulos']);
      }
    },(e) =>{
      this.hayErrores = true;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
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
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const precio = this.form.value.precio;
    const nivelValido = this.form.value.nivelValido;
    const imagenArticulo = this.imagenUrl;
    const estado = this.form.value.idEstado;
    const categoria = this.form.value.idCategoria;
    const usuarioModificador = this.form.value.usuarioModificador;
    let articulo: Articulo = {idArticulo:this.form.value.idArticulo,nombre: nombre, descripcion: descripcion, precio: precio, nivelValido: nivelValido, imagen: imagenArticulo, idEstado: estado.idEstado, idCategoria: categoria.idCategoria, usuarioModificador: usuarioModificador,
                                 fechaModificacion: new Date(), usuarioCreador: this.articulo.usuarioCreador, fechaCreacion: this.articulo.fechaCreacion}
    this.articuloService.actualizarArticulo(articulo).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
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
        timer: 1500
      });
    });
  }

  atras(){
    this.router.navigateByUrl('/admin/articulos/listar-articulos');
  }


}
