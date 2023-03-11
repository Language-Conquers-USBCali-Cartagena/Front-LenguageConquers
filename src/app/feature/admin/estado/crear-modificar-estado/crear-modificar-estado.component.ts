import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-estado',
  templateUrl: './crear-modificar-estado.component.html',
  styleUrls: ['./crear-modificar-estado.component.css']
})
export class CrearModificarEstadoComponent implements OnInit {

  form!: FormGroup;
  estado!:Estado;
  hayErrores = false;
  mensajeError: string="";


  constructor(private fb: FormBuilder,private router: Router,  private activatedRoute: ActivatedRoute, private estadoService: EstadoService) {
    this.crearEstado();
   }

  crearEstado() {
    this.form = this.fb.group({
      idEstado: ['', Validators.required],
      nombreEstado:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.crearEstado();
    this.cargarEstado();

  }

  guardarEstado(){
    const nombreEstado = this.form.value.nombreEstado;
    const usuarioCreador = this.form.value.usuarioCreador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let estado: Estado = {estado: nombreEstado, usuarioCreador: usuarioCreador,
                                  fechaCreacion: fechaActual}
      this.estadoService.crearEstado(estado).subscribe(data => {
        if(data){
          Swal.fire({
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/admin/estado/listar-estados']);
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

  setEstado(estado: Estado){
    this.form.patchValue({
      idEstado: estado.idEstado,
      nombreEstado: estado.estado,
      usuarioCreador: estado.usuarioCreador,
      fechaCreacion: estado.fechaCreacion,
      usuarioModificador: estado.usuarioModificador,
      fechaModificacion: estado.fechaModificacion
    });
  }

  cargarEstado(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if(id){
          this.estadoService.consultarPorId(id).subscribe((data) => {
            this.estado = data;
            this.setEstado(this.estado);
          })
        }
      }
    )
  }
  actualizar():void{
    const nombreEstado = this.form.value.nombreEstado;
    const usuarioModificador = this.form.value.usuarioModificador;
    const moment = require('moment-timezone');
    const pais = 'Colombia';
    const fechaActual = moment().tz(pais).format();
    let estado: Estado = {idEstado: this.form.value.idEstado, estado: nombreEstado, usuarioModificador: usuarioModificador,
                                  fechaModificacion: fechaActual,fechaCreacion: this.estado.fechaCreacion, usuarioCreador: this.estado.usuarioCreador}
    this.estadoService.actualizarEstado(estado).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/estado/listar-estados']);
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

  atras(){
    this.router.navigateByUrl('/admin/estado/listar-estados');
  }


}
