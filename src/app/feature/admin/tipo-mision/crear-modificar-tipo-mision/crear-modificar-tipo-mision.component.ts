import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoMision } from 'src/app/shared/models/tipoMision';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-tipo-mision',
  templateUrl: './crear-modificar-tipo-mision.component.html',
  styleUrls: ['./crear-modificar-tipo-mision.component.css']
})
export class CrearModificarTipoMisionComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private router:Router) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
  }

  crearTipoMision(){
    const descripcion = this.form.value.descripcion;
    const usuarioCreador = this.form.value.usuarioCreador;
    let tipoMision: TipoMision = {descripcion: descripcion, usuarioCreador: usuarioCreador,fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Tipo Misión se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/tipo-mision/listar');
  }

}
