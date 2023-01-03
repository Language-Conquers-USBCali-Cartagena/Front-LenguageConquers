import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: UntypedFormGroup;
  tipoMision!: TipoMision;
  constructor(private fb: UntypedFormBuilder,private router:Router,  private activatedRoute: ActivatedRoute, private tipoMisionService: TipoMisionService) {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
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

  setTipoMision(tipoMision: TipoMision) {
    this.form.setValue({
      descripcion: tipoMision.descripcion,
      usuarioCreador: tipoMision.usuarioCreador,
      usuarioModificador: tipoMision.usuarioModificador
    });
  }

  cargarLogro(){
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


  atras(){
    this.router.navigateByUrl('/admin/tipo-mision/listar');
  }

}
