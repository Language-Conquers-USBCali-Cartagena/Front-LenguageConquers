import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
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

  form!: FormGroup;
  nivelMision!: NivelMision;
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private nivelMisionService: NivelMisionService,private router:Router,  private activatedRoute: ActivatedRoute) {
    this.crearNivelMision();
   }

   crearNivelMision(){
    this.form = this.fb.group({
      idNivelMision: ['', Validators.required],
      nombre:  ['', Validators.required],
      imgNivelMision: ['', Validators.required],
      puntajeMinimo: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.crearNivelMision();
    this.cargarNivelMision();
  }

  guardarNivelMision(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const imgNivelMision = this.form.value.imgNivelMision;
    const puntajeMinimo = this.form.value.puntajeMinimo;
    const usuarioCreador = this.form.value.usuarioCreador;
    let nivelMision: NivelMision = {nombre: nombre, puntajeMinimo: puntajeMinimo, imgNivelMision: imgNivelMision, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.nivelMisionService.crearNivelMision(nivelMision).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El Nivel Misión se ha creado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/nivel-mision/listar']);
      }
    },  (e) => {
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

  setNivelMision(nivelMision: NivelMision){
    this.form.setValue({
      idNivelMision: nivelMision.idNivelMision,
      nombre: nivelMision.nombre,
      imgNivelMision: nivelMision.imgNivelMision,
      puntajeMinimo: nivelMision.puntajeMinimo,
      usuarioCreador:nivelMision.usuarioCreador,
      fechaCreacion: nivelMision.fechaCreacion,
      usuarioModificador: nivelMision.usuarioModificador,
      fechaModificacion: nivelMision.fechaModificacion
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

  actualizar():void{
    const nombre = this.form.value.nombre;
    const imgNivelMision = this.form.value.imgNivelMision;
    const puntajeMinimo = this.form.value.puntajeMinimo;
    const usuarioModificador = this.form.value.usuarioModificador;
    let nivelMision: NivelMision = { idNivelMision: this.form.value.idNivelMision, nombre: nombre, puntajeMinimo: puntajeMinimo, imgNivelMision: imgNivelMision, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date()}
    this.nivelMisionService.actualizarNivelMision(nivelMision).subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'El Nivel Misión se ha actualizado Exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/nivel-mision/listar']);

  },  (e) => {
    this.hayErrores = true;
    this.mensajeError = e['error'];
    console.log(this.mensajeError)
    Swal.fire({
      icon: 'error',
      title: e['error'],
      showConfirmButton: false,
      timer: 1500
    });
  });

  }


  atras(){
    this.router.navigateByUrl('/admin/nivel-mision/listar');
  }
}
