import { Component, OnInit, ViewChild } from '@angular/core';
import { Estudiante } from '../../../shared/models/estudiante';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EstudianteService } from '../../../shared/services/estudiante/estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css'],
  providers: [DatePipe]
})
export class EstudianteComponent implements OnInit {

  listaEstudiante: Estudiante[] = []
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellidos', 'Correo','NickName','Puntaje','Monedas', 'idPrograma', 'idSemestre','idGenero','idAvatar', 'Nacimiento', 'UsuarioCreador','UsuarioModificador', 'FechaCreacion','FechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Estudiante>(this.listaEstudiante);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private estudianteService: EstudianteService, private routerAct: ActivatedRoute, private router: Router, private datePipe: DatePipe) {
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
  registrarEstudiante(){
    this.router.navigateByUrl('admin/estudiante/crearEstudiante');
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

  eliminarEstudiante(idEstudiante:number){
    this.estudianteService.eliminarEstudiante(idEstudiante).subscribe(data =>{
      this.listaEstudiante = this.listaEstudiante.filter(c => c! == idEstudiante);
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      });
      Toast.fire({
        icon: 'success',
        title: data
      });
      this.cargarEstudiante();
    });
  }

  actualizarEstudiante(idEstudiante:number){
    this.router.navigate(['admin/estudiante/actualizarEstudiante/', idEstudiante]);
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }




}
