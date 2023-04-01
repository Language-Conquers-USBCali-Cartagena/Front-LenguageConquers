import { Component, OnInit, ViewChild } from '@angular/core';
import { RetoEstudiante } from '../../../../../shared/models/retoEstudiante';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import { RetoService } from '../../../../../shared/services/reto/reto.service';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { Estudiante } from '../../../../../shared/models/estudiante';

@Component({
  selector: 'app-progreso-estudiante',
  templateUrl: './progreso-estudiante.component.html',
  styleUrls: ['./progreso-estudiante.component.css']
})
export class ProgresoEstudianteComponent implements OnInit {

  listaRetoEstudiantes: RetoEstudiante[] = []
  displayedColumns: string[] = [ 'Reto',  'FechaEntrega', 'intentosRealizados', 'puntaje','Estado'];
  dataSource = new MatTableDataSource<RetoEstudiante>(this.listaRetoEstudiantes);
  id: string | null |undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  idReto = 0;
  nombreEstado: string |undefined;
 idEstudiante!: number;
nombreEstudiante!:string | undefined;

  constructor(private retoEstudianteService: RetoEstudianteService, private routerAct: ActivatedRoute, private router: Router, private estadoService: EstadoService, private retoServicio: RetoService, private estudianteService: EstudianteService ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
    this.idEstudiante = Number(this.id);
   }

  ngOnInit(): void {
    this.cargarRetos();
    this.obtenerEstudiante();
  }

  obtenerEstudiante(){
    this.estudianteService.consultarPorId(this.idEstudiante).subscribe(data => {
      this.nombreEstudiante = data.nombre?.concat(' ', data.apellido!);
    })
  }


  cargarRetos(){
    this.retoEstudianteService.listarPorIdEstudiante(this.idEstudiante).subscribe(resp =>{
      for (let i = 0; i < this.listaRetoEstudiantes.length; i++) {
        const retoEstudiante = this.listaRetoEstudiantes[i];
        this.estadoService.consultarPorId(retoEstudiante.idEstado!).subscribe(estado => {
          retoEstudiante.nombreEstado = estado.estado;
        });
        this.retoServicio.consultarPorId(retoEstudiante.idReto!).subscribe(reto =>{
          retoEstudiante.nombreReto = reto.nombreReto;
        })
      }
      this.dataSource.data = this.listaRetoEstudiantes;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

 onEditarReto(){
  this.router.navigate(['profesor/curso/1/mis-estudiantes'], {queryParams: {listaRetos: JSON.stringify(this.listaRetoEstudiantes)}});
 }


}
