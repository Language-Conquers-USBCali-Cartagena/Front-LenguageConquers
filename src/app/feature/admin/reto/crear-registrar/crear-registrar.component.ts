import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

@Component({
  selector: 'app-crear-registrar',
  templateUrl: './crear-registrar.component.html',
  styleUrls: ['./crear-registrar.component.css']
})
export class CrearRegistrarComponent implements OnInit {

  form!: UntypedFormGroup;
  misiones: Mision[] = [];
  monedas: Monedas[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];

  constructor(private fb: UntypedFormBuilder, private misionService: MisionService , private cursoService: CursoService,private estadoService: EstadoService,private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      descripcion: ['', Validators.required],
      intentos: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaLimite: ['', Validators.required],
      mision: ['', Validators.required],
      curso: ['', Validators.required],
      estado: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getMision();
    this.getCurso();
    this.getEstado();
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

  crearReto(){
    const nombre = this.form.value.nombre;
    const descripcion = this.form.value.descripcion;
    const intentos = this.form.value.intentos;
    const fechaInicio: Date = this.form.value.fechaInicio;
    const fechaLimite: Date = this.form.value.fechaLimite;
    const mision = this.form.value.mision.idMision;
    const estado= this.form.value.estado.idEstado;
    const curso = this.form.value.curso.idCurso;
    const usuarioCreador = this.form.value.usuarioCreador;
    let reto: Reto = {nombre: nombre, descripcion: descripcion, intentos: intentos, fechaInicio: fechaInicio, fechaLimite: fechaLimite,idMision: mision, idEstado: estado, idCurso: curso, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'El Estudiante se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })
    //this.router.navigate(['/usuarios/listar-usuarios']);

  }


  atras(){
    this.router.navigateByUrl('/admin/reto/listar-retos');
  }

}
