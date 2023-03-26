import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Programa } from 'src/app/shared/models/programa';
import { ProgramaService } from 'src/app/shared/services/programa/programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-programa',
  templateUrl: './crear-modificar-programa.component.html',
  styleUrls: ['./crear-modificar-programa.component.css']
})
export class CrearModificarProgramaComponent implements OnInit {

  form!: FormGroup;
  programa!: Programa;
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb:FormBuilder,private router:Router,  private activatedRoute: ActivatedRoute, private programaService:ProgramaService) {
    this.crearPrograma();
   }

   crearPrograma(){
    this.form = this.fb.group({
      idPrograma: ['', Validators.required],
      nombre:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificación: ['', Validators.required]
    });
   }
  ngOnInit(): void {
    this.crearPrograma();
    this.cargarPrograma();
  }

  guardarPrograma(){
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let programa: Programa = {
      nombre: this.form.value.nombre,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date()}
    this.programaService.crearPrograma(programa).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 2000
        });
        this.router.navigate(['/admin/programa/listar-programa']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e['error'];
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });


  }

  setPrograma(programa: Programa){
    this.form.patchValue({
      idPrograma: programa.idPrograma,
      nombre: programa.nombre,
      usuarioCreador: programa.usuarioCreador,
      fechaCreacion: programa.fechaCreacion,
      usuarioModificador: programa.usuarioModificador,
      fechaModificacion: programa.fechaModificacion
    });
  }

  cargarPrograma(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.programaService.consultarPorId(id).subscribe((data) => {
            this.programa = data;
            this.setPrograma(this.programa);
          });
        }
      }
    );
  }

  actualizar():void{
    const moment = require('moment-timezone');
    const pais = 'America/Bogota';
    const fechaActual = moment().tz(pais).format('YYYY-MM-DD');
    let programa: Programa = {
      idPrograma: this.form.value.idPrograma,
      nombre: this.form.value.nombre,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: fechaActual}
    this.programaService.actualizarPrograma(programa).subscribe(data =>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/programa/listar-programa']);
    }, (e) => {
      this.hayErrores = true;
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        showCloseButton: true,
      });
    });
  }
  atras(){
    this.router.navigateByUrl('/admin/programa/listar-programa');
  }

}
