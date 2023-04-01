import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { EstadoService } from '../../../../shared/services/estado/estado.service';
import Swal from 'sweetalert2';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';

@Component({
  selector: 'app-mis-estudiantes',
  templateUrl: './mis-estudiantes.component.html',
  styleUrls: ['./mis-estudiantes.component.css']
})
export class MisEstudiantesComponent implements OnInit {

  listaEstudiante: Estudiante[] = []
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Correo','NickName','Estado', 'progresoEstudiante'];
  dataSource = new MatTableDataSource<Estudiante>(this.listaEstudiante);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  nombreEstado: string |undefined;
  habilitado = true;

  constructor(private estudianteService: EstudianteService, private routerAct: ActivatedRoute, private router: Router, private estadoService: EstadoService, private retoEstudianteService: RetoEstudianteService) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarEstudiante();
  }


  cargarEstudiante(){
    this.estudianteService.getEstudiante().subscribe(resp =>{
      this.listaEstudiante = resp;
      for (let i = 0; i < this.listaEstudiante.length; i++) {
        const estudiante = this.listaEstudiante[i];
        this.estadoService.consultarPorId(estudiante.idEstado!).subscribe(estado => {
          estudiante.nombreEstado = estado.estado;
        });
      }
      this.dataSource.data = this.listaEstudiante;

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

  onVerEstudiante(idEstudiante: number){
    this.retoEstudianteService.listarPorIdEstudiante(idEstudiante).subscribe(data =>{
      if(!data){
        this.habilitado = false;
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El estudiante no ha realizado ningun reto.',
        })
      }
    });
    if (this.habilitado) {
      this.router.navigate(['/profesor/curso/1/progreso-estudiante/', idEstudiante]);
  }
}

}
