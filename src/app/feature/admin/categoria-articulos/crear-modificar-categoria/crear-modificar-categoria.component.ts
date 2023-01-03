import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/shared/models/categoria';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-categoria',
  templateUrl: './crear-modificar-categoria.component.html',
  styleUrls: ['./crear-modificar-categoria.component.css']
})
export class CrearModificarCategoriaComponent implements OnInit {

  form!: UntypedFormGroup;
  estados:Estado[] = [];

  constructor(private fb: UntypedFormBuilder,private estadoService: EstadoService,private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.getEstado();
  }
  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  crearCategoria(){
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const estado= this.form.value.estado.idEstado;
    const usuarioCreador = this.form.value.usuarioCreador;
    let categoria: Categorias = {nombre: nombre, descripcion: descripcion, idEstado: estado, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'La Categoria se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/categoria-articulos/listar');
  }

}
