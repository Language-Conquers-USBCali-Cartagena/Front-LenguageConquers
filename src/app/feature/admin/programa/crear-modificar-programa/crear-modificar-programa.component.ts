import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: UntypedFormGroup;
  programa!: Programa;
  constructor(private fb: UntypedFormBuilder,private router:Router,  private activatedRoute: ActivatedRoute, private programaService:ProgramaService) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  crearPrograma(){
    const nombre = this.form.value.nombre;
    const usuarioCreador = this.form.value.usuarioCreador;
    let programa: Programa = {nombre: nombre, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Programa se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  setPrograma(programa: Programa){
    this.form.setValue({
      nombre: programa.nombre,
      usuarioCreador: programa.usuarioCreador,
      usuarioModificador: programa.usuarioModificador
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

  atras(){
    this.router.navigateByUrl('/admin/programa/listar-programa');
  }

}
