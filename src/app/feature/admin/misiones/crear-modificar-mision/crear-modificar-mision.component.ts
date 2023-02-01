import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Mision } from 'src/app/shared/models/mision';
import { Monedas } from 'src/app/shared/models/monedas';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import Swal from 'sweetalert2';
import { MisionService } from '../../../../shared/services/mision/mision.service';

@Component({
  selector: 'app-crear-modificar-mision',
  templateUrl: './crear-modificar-mision.component.html',
  styleUrls: ['./crear-modificar-mision.component.css']
})
export class CrearModificarMisionComponent implements OnInit {

  form!: FormGroup;
  mision!:Mision;
  monedas: Monedas[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private monedasService: MonedasService,private cursoService: CursoService, private router:Router,  private activatedRoute: ActivatedRoute, private misionService: MisionService) {
    this.crearMision();
   }

   crearMision(){
    this.form = this.fb.group({
      idMision: ['', Validators.required],
      nombre:  ['', Validators.required],
      imagenMision: ['', Validators.required],
      idNivelMision: ['', Validators.required],
      idTipoMision: ['', Validators.required],
      idCurso: ['', Validators.required],
      idMonedas: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }
  ngOnInit(): void {
    this.crearMision();
    this.cargarMision();
    this.getCurso();

  }
  
  getCurso(){
    this.cursoService.getCurso().subscribe(resp => this.cursos = resp)
  }
  getMonedas(){
    this.monedasService.getMoneda().subscribe(resp => this.monedas = resp)
  }

  guardarMision(){
    this.hayErrores = false;
    const nombre = this.form.value.nombre;
    const imagenMision = this.form.value.imagenMision;
    const curso = this.form.value.idCurso;
    const usuarioCreador = this.form.value.usuarioCreador;
    let mision: Mision = {nombre: nombre, imagen: imagenMision, idCurso:curso.idCurso, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}
    this.misionService.crearMision(mision).subscribe(data =>{
      if(data){
        Swal.fire({
          icon: 'success',
          title: data,
          showConfirmButton: false,
          timer: 1500
        });
        this.router.navigate(['/admin/misiones/listar-misiones']);
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

  setMision(mision: Mision) {
    this.form.setValue({
      idMision: mision.idMision,
      nombre: mision.nombre,
      imagenMision: mision.imagen,
      idCurso: mision.idCurso,
      usuarioCreador: mision.usuarioCreador,
      fechaCreacion : mision.fechaCreacion,
      usuarioModificador: mision.usuarioModificador,
      fechaModificacion: mision.fechaModificacion
    });
  }

  cargarMision(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.misionService.consultarPorId(id).subscribe(data => {
            this.mision = data;
            this.setMision(this.mision);
          });
        }
      }
    );
  }

  actualizar():void{
    const nombre = this.form.value.nombre;
    const imagenMision = this.form.value.imagenMision;
    const curso = this.form.value.idCurso;
    const usuarioModificador = this.form.value.usuarioModificador;
    let mision: Mision = {idMision: this.form.value.idMision, nombre: nombre, imagen: imagenMision,  idCurso:curso.idCurso, usuarioModificador: usuarioModificador,
                                  fechaModificacion: new Date(), fechaCreacion: this.mision.fechaCreacion, usuarioCreador: this.mision.usuarioCreador}
    this.misionService.actualizarMision(mision).subscribe(data=>{
      Swal.fire({
        icon: 'success',
        title: data,
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/admin/misiones/listar-misiones']);
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
    this.router.navigateByUrl('/admin/misiones/listar-misiones');
  }

}
