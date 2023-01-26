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

  guardarCategoria(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const estado= this.form.value.idEstado;
    const usuarioCreador = this.form.value.usuarioCreador;
    let categoria: Categorias = {nombre: nombre, descripcion: descripcion, idEstado: estado.idEstado, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.categoriaService.crearCategoria(categoria).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
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
        timer: 1500
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
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const estado= this.form.value.idEstado;
    const usuarioModificador = this.form.value.usuarioCreador;
    let categoria: Categorias = {idCategoria: this.categoria.idCategoria,nombre: nombre, descripcion: descripcion, idEstado: estado.idEstado, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaCreacion: this.categoria.fechaCreacion, usuarioCreador: this.categoria.usuarioCreador}
    this.categoriaService.actualizarCategorias(categoria).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/categoria-articulos/listar']);
    }, (e) => {
      this.hayErrores = true;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      })
    });
  }

  atras(){
    this.router.navigateByUrl('/admin/categoria-articulos/listar');
  }

}
