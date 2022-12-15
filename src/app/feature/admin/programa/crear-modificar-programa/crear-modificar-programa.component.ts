import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Programa } from 'src/app/shared/models/programa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-programa',
  templateUrl: './crear-modificar-programa.component.html',
  styleUrls: ['./crear-modificar-programa.component.css']
})
export class CrearModificarProgramaComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  crearPrograma(){
    const nombre = this.form.value.nombre;
    const usuarioCreador = this.form.value.usuarioCreador;
    let programa: Programa = {nombre: nombre, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Programa se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  atras(){
    this.router.navigateByUrl('/admin/programa/listar-programa');
  }

}
