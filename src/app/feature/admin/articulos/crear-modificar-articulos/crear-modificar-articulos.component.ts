import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from 'src/app/shared/models/articulos';
import { Categorias } from 'src/app/shared/models/categoria';
import { Estado } from 'src/app/shared/models/estado';
import { CategoriaService } from 'src/app/shared/services/categoria/categoria.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-articulos',
  templateUrl: './crear-modificar-articulos.component.html',
  styleUrls: ['./crear-modificar-articulos.component.css']
})
export class CrearModificarArticulosComponent implements OnInit {

  form!: UntypedFormGroup;
  categorias: Categorias[] = [];
  estados:Estado[] = [];

  constructor(private fb: UntypedFormBuilder, private categoriaService: CategoriaService, private estadoService: EstadoService,private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      nivelValido: ['', Validators.required],
      imagenArticulo: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getCategoria();
    this.getEstado();
  }
  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }
  getCategoria(){
    this.categoriaService.getCategoria().subscribe(resp => this.categorias = resp)
  }
  crearArticulo(){
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const precio = this.form.value.precio;
    const nivelValido = this.form.value.nivelValido;
    const imagenCategorias = this.form.value.imagenCategorias;
    const estado= this.form.value.estado.idEstado;
    const categoria = this.form.value.categoria.idCategoria;
    const usuarioCreador = this.form.value.usuarioCreador;
    let articulo: Articulo = {nombre: nombre, descripcion: descripcion, precio: precio,  nivelValido: nivelValido, imagen: imagenCategorias, idEstado: estado, idCategoria: categoria, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Articulo se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/articulos/listar-articulos');
  }


}
