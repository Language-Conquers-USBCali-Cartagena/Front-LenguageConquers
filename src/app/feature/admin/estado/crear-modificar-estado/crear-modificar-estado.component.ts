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
    let estado: Estado = {
      estado: this.form.value.nombreEstado,
      usuarioCreador: this.form.value.usuarioCreador,
      fechaCreacion: new Date()}
      this.estadoService.crearEstado(estado).subscribe(data => {
        if(data){
          Swal.fire({
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(['/admin/estado/listar-estados']);
        }
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
    let estado: Estado = {
      idEstado: this.form.value.idEstado,
      estado: this.form.value.nombreEstado,
      usuarioModificador: this.form.value.usuarioModificador,
      fechaModificacion: new Date(),
      fechaCreacion: this.estado.fechaCreacion,
      usuarioCreador: this.estado.usuarioCreador}
    this.estadoService.actualizarEstado(estado).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigate(['/admin/estado/listar-estados']);
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
    this.router.navigateByUrl('/admin/estado/listar-estados');
  }


}
