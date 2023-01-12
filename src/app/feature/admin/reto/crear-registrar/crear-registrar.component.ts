import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Mision } from 'src/app/shared/models/mision';
import { Monedas } from 'src/app/shared/models/monedas';
import { NivelMision } from 'src/app/shared/models/nivelMision';
import { Reto } from 'src/app/shared/models/reto';
import { TipoMision } from 'src/app/shared/models/tipoMision';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import { MisionService } from 'src/app/shared/services/mision/mision.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import { NivelMisionService } from 'src/app/shared/services/nivelMision/nivel-mision.service';
import { TipoMisionService } from 'src/app/shared/services/tipoMision/tipo-mision.service';
import Swal from 'sweetalert2';
import { RetoService } from '../../../../shared/services/reto/reto.service';

@Component({
  selector: 'app-crear-registrar',
  templateUrl: './crear-registrar.component.html',
  styleUrls: ['./crear-registrar.component.css']
})
export class CrearRegistrarComponent implements OnInit {

  form!: FormGroup;
  reto!: Reto;
  misiones: Mision[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];
  hayErrores = false;
  mensajeError: string="";

  constructor(private fb: FormBuilder, private misionService: MisionService , private cursoService: CursoService,private estadoService: EstadoService,private router:Router, private activatedRoute: ActivatedRoute, private retoService: RetoService) {
    this.crearReto();
   }

   crearReto(){
    this.form = this.fb.group({
      nombreReto:  ['', Validators.required],
      descripcion: ['', Validators.required],
      intentosPermitidos: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      idMision: ['', Validators.required],
      idCurso: ['', Validators.required],
      idEstado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
      usuarioModificador: ['', Validators.required],
      fechaModificacion: ['', Validators.required]
    });
   }

  ngOnInit(): void {
    this.crearReto();
    this.cargarReto();
    this.getMision();
    this.getCurso();
    this.getEstado();
    this.actualizar();
  }
  getMision(){
    this.misionService.getMision().subscribe(resp => this.misiones = resp)
  }

  getCurso(){
    this.cursoService.getCurso().subscribe(resp => this.cursos = resp)
  }

  getEstado(){
    this.estadoService.getEstados().subscribe(resp => this.estados = resp)
  }

  guardarReto(){
    const nombre = this.form.value.nombreReto;
    const descripcion = this.form.value.descripcion;
    const intentos = this.form.value.intentosPermitidos;
    const fechaInicio: Date  = this.form.value.fechaInicio;
    const fechaLimite: Date  = this.form.value.fechaLimite;
    const mision = this.form.value.idMision;
    const estado= this.form.value.idEstado;
    const curso = this.form.value.idCurso;
    const usuarioCreador = this.form.value.usuarioCreador;
    const esGrupal = false;
    const cantidadEstudiantes = 0;
    let reto: Reto = {nombreReto: nombre, descripcion: descripcion, intentosPermitidos: intentos, fechaInicio: fechaInicio, fechaLimite: fechaLimite,idMision: mision, idEstado: estado, idCurso: curso, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date(), esGrupal: false, cantidadEstudiantes: 0}
    this.retoService.crearReto(reto).subscribe(data => {
      if(data){
        Swal.fire({
          icon: 'success',
          title: 'El Reto se ha creado Exitosamente',
          showConfirmButton: false,
          timer: 1500
        });
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

  setReto(reto: Reto) {
    this.form.patchValue({
      nombreReto: reto.nombreReto,
      descripcion: reto.descripcion,
      intentosPermitidos: reto.intentosPermitidos,
      fechaInicio: reto.fechaInicio,
      fechaLimite: reto.fechaLimite,
      idMision: reto.idMision,
      idEstado: reto.idEstado,
      idCurso: reto.idCurso,
      usuarioCreador: reto.usuarioCreador,
      fechaCreacion: reto.fechaCreacion,
      usuarioModificador: reto.usuarioModificador,
      fechaModificacion: reto.fechaModificacion
    });
  }

  cargarReto(){
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params['id'];
        if ( id ) {
          this.retoService.consultarPorId(id).subscribe((data) => {
            this.reto = data;
            this.setReto(this.reto);
          });
        }
      }
    );
  }

  actualizar():void{
    let id = localStorage.getItem('id');
    this.retoService.consultarPorId(+id!).subscribe((data) => {
      this.reto = data;
    });
    /*
    const nombre = this.form.value.nombreReto;
    const descripcion = this.form.value.descripcion;
    const intentos = this.form.value.intentosPermitidos;
    const fechaInicio: Date = this.form.value.fechaInicio;
    const fechaLimite: Date = this.form.value.fechaLimite;
    const mision = this.form.value.idMision;
    const estado= this.form.value.idEstado;
    const curso = this.form.value.idCurso;
    const usuarioModificador = this.form.value.usuarioModificador;
    this.reto = new Reto(this.form.value.idReto,nombre,descripcion,intentos, fechaInicio,  fechaLimite, mision,  estado, curso,  usuarioModificador,
                                   new Date(),false,0)
    this.retoService.actualizarReto(this.reto).subscribe(()=>{
      this.router.navigate(['/admin/reto/listar-retos']);
    });*/
  }

  Editar(reto: Reto) {
    this.retoService.actualizarReto(reto).subscribe(data =>{
      this.reto = data;
      Swal.fire({
        icon: 'success',
        title: 'El Reto se ha creado Exitosamente',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigateByUrl('/admin/reto/listar-retos');
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
    }
    );
  }

  atras(){
    this.router.navigateByUrl('/admin/reto/listar-retos');
  }

}
