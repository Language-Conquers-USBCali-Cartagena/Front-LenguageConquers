import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from '../../../../../shared/services/estado/estado.service';
import { RetoService } from '../../../../../shared/services/reto/reto.service';
import { Reto } from 'src/app/shared/models/reto';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProfesorServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-habilitar-reto',
  templateUrl: './habilitar-reto.component.html',
  styleUrls: ['./habilitar-reto.component.css']
})
export class HabilitarRetoComponent implements OnInit {

  retoForm: FormGroup = new FormGroup({});
  estados:Estado[] = [];
  reto: Reto ={};
  estado!: string;
  idEstado: number | undefined;
  nombreEstado!: string | undefined;
  retoActualizado!: Reto;
  correo: string ='';
  nombreProfesor: string| undefined;

  constructor(private fb: FormBuilder, private estadoService:  EstadoService, private retoService: RetoService, private router: Router, private route: ActivatedRoute, private profesorService: ProfesorServicesService) { }


   ngOnInit(){
    const retoString = this.route.snapshot.queryParamMap.get('listaRetos')?.replace(/\[|\]/g, '')!;
    this.reto = JSON.parse(retoString);
    this.idEstado = this.reto.idEstado;
    this.obtenerProfesor();

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

  async obtenerProfesor() {
    let correo = localStorage.getItem("correo")!;
    await this.profesorService.getProfesor(correo).toPromise().then((response) =>{
      localStorage.setItem("usuario", JSON.stringify(response));
      this.nombreProfesor = response.nombre?.concat(" ", response.apellido!);
    });
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

  setEstado(idEstado: number){
    this.estadoService.consultarPorId(idEstado!).subscribe(data => {
      this.nombreEstado = data.estado;
    });

  }

  actualizarReto():void{
    const estado= this.retoForm.value.idEstado;
    const estadoSeleccionado = this.estados.find(e => e.idEstado == estado);
    const idEstado = Number(estadoSeleccionado?.idEstado ?? "");
    const usuarioModificador = this.nombreProfesor;
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let reto: Reto = {
      idReto: this.reto!.idReto,
      nombreReto: this.reto!.nombreReto,
      descripcion: this.reto!.descripcion,
      maximoIntentos: this.retoForm.value.maximoIntentos,
      fechaInicio: this.retoForm.value.fechaInicio,
      fechaLimite: this.retoForm.value.fechaLimite,
      idMision: this.reto!.idMision,
      idEstado: idEstado,
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
      imagen1: this.reto!.imagen1,
      imagen2: this.reto!.imagen2,
      urlVideo1: this.reto!.urlVideo1,
      urlVideo2: this.reto!.urlVideo2}
    this.retoService.actualizarReto(reto).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.atras();
    }, (e) => {
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
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
