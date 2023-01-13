import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoMision } from 'src/app/shared/models/tipoMision';
import Swal from 'sweetalert2';
import { TipoMisionService } from '../../../../shared/services/tipoMision/tipo-mision.service';

@Component({
  selector: 'app-crear-modificar-tipo-mision',
  templateUrl: './crear-modificar-tipo-mision.component.html',
  styleUrls: ['./crear-modificar-tipo-mision.component.css']
})
export class CrearModificarTipoMisionComponent implements OnInit {

  form!: FormGroup;
  tipoMision!: TipoMision;
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb: FormBuilder,private router:Router,  private activatedRoute: ActivatedRoute, private tipoMisionService: TipoMisionService) {
    this.crearTipoMision();
   }

   crearTipoMision(){
    this.form = this.fb.group({
      idTipoMision: ['', Validators.required],
      descripcion: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }


  ngOnInit(): void {
    this.crearTipoMision();
    this.cargarTipoMision();
  }

  guardarTipoMision(){
    this.hayErrores = false;
    const descripcion = this.form.value.descripcion;
    const usuarioCreador = this.form.value.usuarioCreador;
    let tipoMision: TipoMision = {descripcion: descripcion, usuarioCreador: usuarioCreador,fechaCreacion: new Date()}
    this.tipoMisionService.crearTipoMision(tipoMision).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El Tipo Misión se ha creado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/tipo-mision/listar']);
      }
    },(e) => {
      this.hayErrores = true;
      this.mensajeError = e.error;
      console.log(e['error']);
      Swal.fire({
        icon: 'error',
        title: e.error,
        showConfirmButton: false,
        timer: 1500
      });
    });

  }

  setTipoMision(tipoMision: TipoMision) {
    this.form.setValue({
      idTipoMision: tipoMision.idTipoMision,
      descripcion: tipoMision.descripcion,
      usuarioCreador: tipoMision.usuarioCreador,
      fechaCreacion: tipoMision.fechaCreacion,
      usuarioModificador: tipoMision.usuarioModificador,
      fechaModificacion: tipoMision.fechaModificacion
    });
  }

  cargarTipoMision(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.tipoMisionService.consultarPorId(id).subscribe((data) => {
            this.tipoMision = data;
            this.setTipoMision(this.tipoMision);
          });
        }
      }
    );
  }

  actualizar():void{
    const descripcion = this.form.value.descripcion;
    const usuarioModificador = this.form.value.usuarioModificador;
    let tipoMision: TipoMision = {idTipoMision: this.form.value.idTipoMision, descripcion: descripcion, usuarioModificador: usuarioModificador,fechaModificacion: new Date()}
    this.tipoMisionService.actualizarTipoMision(tipoMision).subscribe(() =>{
      Swal.fire({
        icon: 'success',
        title: 'El Tipo Misión se ha actualizado Exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/tipo-mision/listar']);
      },(e) => {
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
    this.router.navigateByUrl('/admin/tipo-mision/listar');
  }

}
