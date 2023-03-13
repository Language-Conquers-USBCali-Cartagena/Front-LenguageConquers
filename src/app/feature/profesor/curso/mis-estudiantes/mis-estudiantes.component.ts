import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';

@Component({
  selector: 'app-mis-estudiantes',
  templateUrl: './mis-estudiantes.component.html',
  styleUrls: ['./mis-estudiantes.component.css']
})
export class MisEstudiantesComponent implements OnInit {

  listaEstudiante: Estudiante[] = []
  displayedColumns: string[] = ['Nombre', 'Apellidos', 'Correo','NickName', 'idReto', 'intentos','puntaje','FechaEntrega', 'idEstado'];
  dataSource = new MatTableDataSource<Estudiante>(this.listaEstudiante);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private estudianteService: EstudianteService, private routerAct: ActivatedRoute, private router: Router) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarEstudiante();
  }


  cargarEstudiante(){
    this.estudianteService.getEstudiante().subscribe(resp =>{
      this.listaEstudiante = resp;
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

}
