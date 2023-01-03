import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: UntypedFormGroup;
  estado!:Estado;
  constructor(private fb: UntypedFormBuilder,private router: Router,  private activatedRoute: ActivatedRoute, private estadoService: EstadoService) {
    this.form = this.fb.group({
      estado:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearEstado(){
    const nombreEstado = this.form.value.estado;
    const usuarioCreador = this.form.value.usuarioCreador;
    let estado: Estado = {estado: nombreEstado, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Estado se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  setEstado(estado: Estado){
    this.form.setValue({
      nombreEstado: estado.estado,
      usuarioCreador: estado.usuarioCreador,
      usuarioModificador: estado.usuarioModificador
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

  atras(){
    this.router.navigateByUrl('/admin/estado/listar-estados');
  }


}
