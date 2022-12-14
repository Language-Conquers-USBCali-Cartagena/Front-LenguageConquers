import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Estado } from 'src/app/shared/models/estado';
import { Mision } from 'src/app/shared/models/mision';
import { Monedas } from 'src/app/shared/models/monedas';
import { NivelMision } from 'src/app/shared/models/nivelMision';
import { TipoMision } from 'src/app/shared/models/tipoMision';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import { NivelMisionService } from 'src/app/shared/services/nivelMision/nivel-mision.service';
import { TipoMisionService } from 'src/app/shared/services/tipoMision/tipo-mision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-modificar-mision',
  templateUrl: './crear-modificar-mision.component.html',
  styleUrls: ['./crear-modificar-mision.component.css']
})
export class CrearModificarMisionComponent implements OnInit {

  form!: UntypedFormGroup;
  tipoMisiones: TipoMision[] = [];
  nivelMisiones: NivelMision[] = [];
  monedas: Monedas[] = [];
  cursos: Curso[] = [];
  estados:Estado[] = [];

  constructor(private fb: UntypedFormBuilder, private tipoMisionService: TipoMisionService, private nivelMisionService: NivelMisionService, private monedasService: MonedasService,private cursoService: CursoService, private router:Router) {
    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      nivelMision: ['', Validators.required],
      tipoMision: ['', Validators.required],
      curso: ['', Validators.required],
      monedas: ['', Validators.required],
      usuarioCreador: ['', Validators.required],
      fechaCreacion: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.getTipoMision();
    this.getNivelMision();
    this.getCurso();
    this.getMonedas();
  }
  getTipoMision(){
    this.tipoMisionService.getTipoMision().subscribe(resp => this.tipoMisiones = resp)
  }
  getNivelMision(){
    this.nivelMisionService.getNivelMision().subscribe(resp => this.nivelMisiones = resp)
  }
  getCurso(){
    this.cursoService.getCurso().subscribe(resp => this.cursos = resp)
  }
  getMonedas(){
    this.monedasService.getMoneda().subscribe(resp => this.monedas = resp)
  }

  crearMision(){
    const nombre = this.form.value.nombre;
    const nivelMision = this.form.value.nivelMision;
    const tipoMision = this.form.value.tipoMision;
    const curso = this.form.value.curso.idCurso;
    const monedas = this.form.value.monedas.idMonedas;
    const usuarioCreador = this.form.value.usuarioCreador;
    let mision: Mision = {nombre: nombre, idNivelMision: nivelMision, idTipoMision: tipoMision, idCurso:curso, idMonedas: monedas, usuarioCreador: usuarioCreador,
                                  fechaCreacion: new Date()}

    Swal.fire({
      icon: 'success',
      title: 'La Misión se ha creado Exitosamente',
      showConfirmButton: false,
      timer: 1500
    })

  }


  atras(){
    this.router.navigateByUrl('/admin/misiones/listar-misiones');
  }

}
