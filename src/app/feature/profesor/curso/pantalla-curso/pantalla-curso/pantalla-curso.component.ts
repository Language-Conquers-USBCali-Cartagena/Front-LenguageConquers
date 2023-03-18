import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/shared/models/curso';
import { Profesor } from 'src/app/shared/models/profesor';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Reto } from 'src/app/shared/models/reto';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';


@Component({
  selector: 'app-pantalla-curso',
  templateUrl: './pantalla-curso.component.html',
  styleUrls: ['./pantalla-curso.component.css']
})
export class PantallaCursoComponent implements OnInit {

  isRetoLista = true;
  isConfigReto = false;
  isEstudiantes = false;
  curso?:Curso[];
  idCurso: number = 0;
  profesor: Profesor = {};
  inicioCurso: Date | undefined;
  finalCurso:   Date | undefined;
  cantEstudiantiantes: number | undefined= 0;
  progresoCurso: number | undefined =0;
  nombreEstado!: string | undefined;
  idEstado: number | undefined = 0;
  fechaFormateadaInicio!: string;
  fechaFormateadaFinal!:string;
  nombreCurso: string |undefined;


  retoSeleccionado: Reto | undefined;
  retos: Reto[] = [];


  constructor( private cursoService: CursoService, private estadoService: EstadoService,
    private activateRouter: ActivatedRoute, private router: Router) { }

  ngOnInit() {
   this.cargarCurso();
  }

  cargarCurso(){
    this.activateRouter.params.subscribe(
      (params) => {
        const id = params['curso'];
        if ( id ) {


          this.cursoService.consultarPorId(id).subscribe((data) => {
            this.nombreCurso = data.nombre;
            this.inicioCurso = data.inicioCurso;
            this.finalCurso = data.finCurso;
            const datePipe = new DatePipe('en-US');
            this.fechaFormateadaInicio = datePipe.transform(this.inicioCurso, 'dd-MM-yyyy')!;
            this.fechaFormateadaFinal = datePipe.transform(this.finalCurso, 'dd-MM-yyyy')!;
            this.cantEstudiantiantes = data.cantidadEstudiantes;
            this.progresoCurso = data.progreso;
            this.setEstado(data.idEstado!);
          });
        }
      }
    );
  }

  setEstado(idEstado: number){
    this.estadoService.consultarPorId(idEstado).subscribe(data => {
      this.nombreEstado = data.estado;
    });
  }

  onActualizarReto(retoActualizado: Reto) {
    const index = this.retos.findIndex(reto => reto.idReto === retoActualizado.idReto);
    if (index !== -1) {
      this.retos[index] = retoActualizado;

    }

  }

  onEditarReto(reto: Reto){
    this.retoSeleccionado = reto;
    this.isRetoLista = false;
    this.isConfigReto = true;
  }

  listaRetos(){
    this.router.navigate(['/profesor/curso/1/lista-curso']);
  }


  misEstudiantes(){
    this.router.navigate(['/profesor/curso/1/mis-estudiantes']);
  }

}
