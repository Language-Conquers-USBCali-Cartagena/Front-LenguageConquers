import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/shared/models/categoria';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';
import { CategoriaService } from '../../../../shared/services/categoria/categoria.service';

@Component({
  selector: 'app-crear-modificar-categoria',
  templateUrl: './crear-modificar-categoria.component.html',
  styleUrls: ['./crear-modificar-categoria.component.css']
})
export class CrearModificarCategoriaComponent implements OnInit {

  form!: FormGroup;
  estados:Estado[] = [];
  categoria!: Categorias;
  hayErrores = false;
  mensajeError: string="";
  nombreEstado: string | undefined;



  constructor(private fb: FormBuilder,private estadoService: EstadoService,private router:Router, private categoriaService: CategoriaService, private activatedRoute: ActivatedRoute) {
    this.crearCategoria();
   }
   crearCategoria(){
    this.form = this.fb.group({
      idCategoria: ['', Validators.required],
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.crearCategoria();
    this.cargarCategorias();
    this.getEstado();
  }
  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }
  setEstado(idEstado: number){
    this.estadoService.consultarPorId(idEstado).subscribe(data =>{
      this.nombreEstado = data.estado;
    })
  }

  guardarCategoria(){
    this.hayErrores = false;
    const estado= this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado === estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ??"");
    let categoria: Categorias = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      idEstado: idEstado,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date()}
    this.categoriaService.crearCategoria(categoria).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/categoria-articulos/listar']);
      }
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

  setCategoria(categoria:Categorias){
    this.form.setValue({
      idCategoria: categoria.idCategoria,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      idEstado: categoria.idEstado,
      usuarioCreador: categoria.usuarioCreador,
      fechaCreacion: categoria.fechaCreacion,
      usuarioModificador: categoria.usuarioModificador,
      fechaModificacion: categoria.fechaModificacion
    });
  }

  cargarCategorias(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.categoriaService.consultarPorId(id).subscribe((data) => {
            this.categoria= data;
            this.setCategoria(this.categoria);
          });
        }
      }
    );
  }

  actualizar(): void{
    const estado= this.form.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado === estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ??"");
    let categoria: Categorias = {
      idCategoria: this.categoria.idCategoria,
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      idEstado: idEstado,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: new Date(),
      fechaCreacion: this.categoria.fechaCreacion,
      usuarioCreador: this.categoria.usuarioCreador}
    this.categoriaService.actualizarCategorias(categoria).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/categoria-articulos/listar']);
    }, (e) => {
      this.hayErrores = true;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      })
    });
  }

  atras(){
    this.router.navigateByUrl('/admin/categoria-articulos/listar');
  }

}
