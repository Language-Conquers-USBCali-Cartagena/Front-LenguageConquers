import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from '../../../../../shared/services/estado/estado.service';
import { RetoService } from '../../../../../shared/services/reto/reto.service';
import { Reto } from 'src/app/shared/models/reto';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-habilitar-reto',
  templateUrl: './habilitar-reto.component.html',
  styleUrls: ['./habilitar-reto.component.css']
})
export class HabilitarRetoComponent implements OnInit {

  retoForm: FormGroup = new FormGroup({});
  estados:Estado[] = [];
  reto: Reto ={};

  
  retoActualizado!: Reto;
  
  constructor(private fb: FormBuilder, private estadoService:  EstadoService, private retoService: RetoService, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    const retoString = this.route.snapshot.queryParamMap.get('listaRetos')?.replace(/\[|\]/g, '')!;
    this.reto = JSON.parse(retoString);
    
    
    this.retoForm = this.fb.group({
      maximoIntentos: ['', Validators.required],
      fechaInicio:  ['', Validators.required],
      fechaLimite:  ['', Validators.required],
      idEstado:  ['', Validators.required],
      moneda:  ['', Validators.required],
    });

    if (this.reto) {
      this.retoForm.patchValue({
        maximoIntentos: this.reto.maximoIntentos,
        fechaInicio: this.reto.fechaInicio,
        fechaLimite: this.reto.fechaLimite,
        idEstado: this.reto.idReto,
        moneda: this.reto.moneda,
      });
    }
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
      mmoneda: reto.moneda,
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
      idReto: this.reto!.idReto,
      nombreReto: this.reto!.nombreReto,
      descripcion: this.reto!.descripcion,
      maximoIntentos: intentos,
      fechaInicio: fechaInicio,
      fechaLimite: fechaLimite,
      idMision: this.reto!.idMision,
      idEstado: estado.idEstado,
      idCurso: this.reto!.idCurso,
      usuarioModificador: usuarioModificador,
      fechaModificacion: fechaActual,
      moneda: this.retoForm.value.moneda,
      esGrupal: false,
      cantidadEstudiantes: 0,
      fechaCreacion: this.reto!.fechaCreacion,
      usuarioCreador: this.reto!.usuarioCreador,
      solucion: this.reto!.solucion,
      descripcionTeoria: this.reto!.descripcionTeoria,
      imgTema1: this.reto!.imgTema1,
      imgTema2: this.reto!.imgTema2,
      urlVideo1: this.reto!.urlVideo1,
      urlVideo2: this.reto!.urlVideo2}
    this.retoService.actualizarReto(reto).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.atras();
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
    const ruta = this.router.url.split('/');
    ruta.pop();
    const newRuta = ruta.join('/');
    this.router.navigateByUrl(newRuta);
  }


}
