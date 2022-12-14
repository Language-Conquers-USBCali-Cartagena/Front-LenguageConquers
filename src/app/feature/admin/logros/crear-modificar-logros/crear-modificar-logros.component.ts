import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-logros',
  templateUrl: './crear-modificar-logros.component.html',
  styleUrls: ['./crear-modificar-logros.component.css']
})
export class CrearModificarLogrosComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      imagenLogro: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }
  crearLogro(){
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const imagenLogro = this.form.value.imagenLogro;
    const usuarioCreador = this.form.value.usuarioCreador;
    let logro: Logros = {nombre: nombre, descripcion: descripcion, imagen: imagenLogro, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Logro se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/logros/listar-logros');
  }
}
