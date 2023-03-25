import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesor } from 'src/app/shared/models/profesor';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css'],
  providers: [DatePipe]
})
export class ProfesorComponent implements OnInit {

  listaProfesor: Profesor[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'foto', 'idGenero','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Profesor>(this.listaProfesor);
  id: string | null |undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private profesorService: ProfesorService,private routerAct: ActivatedRoute,private router: Router,  private datePipe: DatePipe ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarProfesor();
  }

  cargarProfesor(){
    this.profesorService.getProfesor().subscribe(resp =>{
      this.listaProfesor = resp;
      this.dataSource.data = this.listaProfesor;
    })
  }

  registrarProfesor(){
    this.router.navigateByUrl('admin/profesor/crearProfesor');
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

  eliminarProfesor(idProfesor: number){
    this.profesorService.eliminarProfesor(idProfesor).subscribe(data => {
      this.listaProfesor = this.listaProfesor.filter(c => c! == idProfesor);
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
      this.cargarProfesor();
    });
  }

  actualizarProfesor(idProfesor:number){
    this.router.navigate(['/admin/profesor/actualizarProfesor/', idProfesor]);
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }

}
