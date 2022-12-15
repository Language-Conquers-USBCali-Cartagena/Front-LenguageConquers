import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Monedas } from 'src/app/shared/models/monedas';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crea-modificar-monedas',
  templateUrl: './crea-modificar-monedas.component.html',
  styleUrls: ['./crea-modificar-monedas.component.css']
})
export class CreaModificarMonedasComponent implements OnInit {

  form!: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder,private router:Router) {
    this.form = this.fb.group({
      cantidad: ['', Validators.required],
      imagenMoneda: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  crearMoneda(){
    const cantidad = this.form.value.cantidad;
    const imagenMoneda = this.form.value.imagenMoneda;
    const usuarioCreador = this.form.value.usuarioCreador;
    let moneda: Monedas = {
      cantidad: cantidad, imgMoneda: imagenMoneda, usuarioCreador: usuarioCreador,
      fechaCreacion: new Date(),
    }

    Swal.fire({
      icon: 'success',
      title: 'La moneda se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/moneda/listar-monedas');
  }


}
