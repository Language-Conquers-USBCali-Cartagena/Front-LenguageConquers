import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelMision } from 'src/app/shared/models/nivelMision';
import { NivelMisionService } from 'src/app/shared/services/nivelMision/nivel-mision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-nivel-mision',
  templateUrl: './crear-modificar-nivel-mision.component.html',
  styleUrls: ['./crear-modificar-nivel-mision.component.css']
})
export class CrearModificarNivelMisionComponent implements OnInit {

  form!: UntypedFormGroup;
  nivelMision!: NivelMision;

  constructor(private fb: UntypedFormBuilder, private nivelMisionService: NivelMisionService,private router:Router,  private activatedRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      imgNivelMision: ['', Validators.required],
      puntajeMinimo: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required]
    })
   }

  ngOnInit(): void {}

  crearNivelMision(){
    const nombre = this.form.value.nombre;
    const imgNivelMision = this.form.value.imgNivelMision;
    const puntajeMinimo = this.form.value.puntajeMinimo;
    const usuarioCreador = this.form.value.usuarioCreador;
    let nivelMision: NivelMision = {nombre: nombre, puntajeMinimo: puntajeMinimo, imgNivelMision: imgNivelMision, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Nivel Misión se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }

  setNivelMision(nivelMision: NivelMision){
    this.form.setValue({
      nombre: nivelMision.nombre,
      imagen: nivelMision.imgNivelMision,
      puntajeMinimo: nivelMision.puntajeMinimo,
      usuarioCreador:nivelMision.usuarioCreador,
      usuarioModificador: nivelMision.usuarioModificador
    });
  }

  cargarNivelMision(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.nivelMisionService.consultarPorId(id).subscribe((data) => {
            this.nivelMision = data;
            this.setNivelMision(this.nivelMision);
          });
        }
      }
    );
  }


  atras(){
    this.router.navigateByUrl('/admin/nivel-mision/listar');
  }
}
