import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from '../../../../../shared/services/estado/estado.service';
import { RetoService } from '../../../../../shared/services/reto/reto.service';
import { Reto } from 'src/app/shared/models/reto';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilitar-reto',
  templateUrl: './habilitar-reto.component.html',
  styleUrls: ['./habilitar-reto.component.css']
})
export class HabilitarRetoComponent implements OnInit {

  retoForm: FormGroup = new FormGroup({});
  estados:Estado[] = [];
  reto!: Reto;

  @Input() retoParaHabilitar: Reto | undefined;
  retoActualizado!: Reto;

  constructor(private fb: FormBuilder, private estadoService:  EstadoService, private retoService: RetoService, private router: Router) { }


  ngOnInit(): void {
    this.retoForm = this.fb.group({
      maximoIntentos: ['', Validators.required],
      fechaInicio:  ['', Validators.required],
      fechaLimite:  ['', Validators.required],
      idEstado:  ['', Validators.required],
      moneda:  ['', Validators.required],
    });

    if (this.retoParaHabilitar) {
      this.retoForm.patchValue({
        maximoIntentos: this.retoParaHabilitar.maximoIntentos,
        fechaInicio: this.retoParaHabilitar.fechaInicio,
        fechaLimite: this.retoParaHabilitar.fechaLimite,
        idEstado: this.retoParaHabilitar.idReto,
        moneda: this.retoParaHabilitar.monedas,
      });
    }
    console.log(this.retoParaHabilitar);
    this.getEstado();
  }


   getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp);
  }

  setReto(reto: Reto) {
    this.retoForm.setValue({
      idReto: reto.idReto,
      nombreReto: reto.nombreReto,
      maximoIntentos: reto.maximoIntentos,
      fechaInicio: reto.fechaInicio,
      fechaLimite: reto.fechaLimite,
      mmoneda: reto.monedas,
      idEstado: reto.idEstado,
      usuarioModificador: reto.usuarioModificador,
      fechaModificacion: reto.fechaModificacion
    });
  }

  actualizarReto():void{
    const intentos = this.retoForm.value.maximoIntentos;
    const fechaInicio: Date  = this.retoForm.value.fechaInicio;
    const fechaLimite: Date  = this.retoForm.value.fechaLimite;
    const monedas  = this.retoForm.value.moneda;
    console.log(monedas);
    const estado= this.retoForm.value.idEstado;
    const usuarioModificador = 'angela';
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let reto: Reto = {
      idReto: this.retoParaHabilitar!.idReto,
      nombreReto: this.retoParaHabilitar!.nombreReto,
      descripcion: this.retoParaHabilitar!.descripcion,
      maximoIntentos: intentos,
      fechaInicio: fechaInicio,
      fechaLimite: fechaLimite,
      idMision: this.retoParaHabilitar!.idMision,
      idEstado: estado.idEstado,
      idCurso: this.retoParaHabilitar!.idCurso,
      usuarioModificador: usuarioModificador,
      fechaModificacion: fechaActual,
      monedas: this.retoForm.value.moneda,
      esGrupal: false,
      cantidadEstudiantes: 0,
      fechaCreacion: this.retoParaHabilitar!.fechaCreacion,
      usuarioCreador: this.retoParaHabilitar!.usuarioCreador,
      solucion: this.retoParaHabilitar!.solucion,
      descripcionTeoria: this.retoParaHabilitar!.descripcionTeoria,
      imgTema1: this.retoParaHabilitar!.imgTema1,
      imgTema2: this.retoParaHabilitar!.imgTema2,
      urlVideo1: this.retoParaHabilitar!.urlVideo1,
      urlVideo2: this.retoParaHabilitar!.urlVideo2}
    this.retoService.actualizarReto(reto).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate([''])
    }, (e) => {
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });
  }




  atras(){

  }


}
