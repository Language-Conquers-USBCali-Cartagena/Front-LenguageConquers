import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Estado } from 'src/app/shared/models/estado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-estado',
  templateUrl: './crear-modificar-estado.component.html',
  styleUrls: ['./crear-modificar-estado.component.css']
})
export class CrearModificarEstadoComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private router: Router) {
    this.form = this.fb.group({
      estado:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  crearEstado(){
    const nombreEstado = this.form.value.estado;
    const usuarioCreador = this.form.value.usuarioCreador;
    let estado: Estado = {estado: nombreEstado, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Estado se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/estado/listar-estados');
  }


}
