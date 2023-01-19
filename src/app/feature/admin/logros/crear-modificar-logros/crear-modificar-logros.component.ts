import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import Swal from 'sweetalert2';
import { LogrosService } from '../../../../shared/services/logros/logros.service';

@Component({
  selector: 'app-crear-modificar-logros',
  templateUrl: './crear-modificar-logros.component.html',
  styleUrls: ['./crear-modificar-logros.component.css']
})
export class CrearModificarLogrosComponent implements OnInit {

  form!: FormGroup;
  logro!: Logros;
  hayErrores= false;
  mensajeError: string="";
  constructor(private fb: FormBuilder,private router:Router, private activatedRoute: ActivatedRoute, private logroService: LogrosService) {
    this,this.crearLogro();
  }

  crearLogro(){
    this.form = this.fb.group({
      idLogro:['', Validators.required],
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      imagenLogro: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crearLogro();
    this.cargarLogro();
  }
  guardarLogro(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const categoria = this.form.value.categoria;
    const imagenLogro = this.form.value.imagenLogro;
    const usuarioCreador = this.form.value.usuarioCreador;
    let logro: Logros = {nombre: nombre, descripcion: descripcion, categoria: categoria,  imagen: imagenLogro, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.logroService.crearLogro(logro).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El logro se ha creado exitosamente.',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/logros/listar-logros']);
      }
    }, (e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e['error'],
        showConfirmButton: false,
        timer: 1500
      });
    });


  }

  setLogros(logro:Logros) {
    this.form.setValue({
      idLogro: logro.idLogro,
      nombre: logro.nombre,
      descripcion: logro.descripcion,
      categoria: logro.categoria,
      imagenLogro: logro.imagen,
      usuarioCreador: logro.usuarioCreador,
      fechaCreacion: logro.fechaCreacion,
      usuarioModificador: logro.usuarioModificador,
      fechaModificacion: logro.fechaModificacion

    });
  }

  cargarLogro(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.logroService.consultarPorId(id).subscribe((data) => {
            this.logro = data;
            this.setLogros(this.logro);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const categoria = this.form.value.categoria;
    const imagenLogro = this.form.value.imagenLogro;
    const usuarioModificador = this.form.value.usuarioModificador;
    let logro: Logros = {idLogro:this.form.value.idLogro ,nombre: nombre, descripcion: descripcion,categoria: categoria, imagen: imagenLogro, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date()}
    this.logroService.actualizarLogro(logro).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El logro se ha actualizado exitosamente.',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/logros/listar-logros']);
  }, (e) => {
    this.hayErrores = true;
    this.mensajeError = e.error;
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
    this.router.navigateByUrl('/admin/logros/listar-logros');
  }
}
