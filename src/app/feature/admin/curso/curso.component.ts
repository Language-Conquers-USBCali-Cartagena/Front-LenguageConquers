import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  listaCursos: Curso[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'password', 'cantidadEstudiantes', 'fechaInicio', 'fechaFin', 'progreso', 'idEstado', 'idProfesor','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Curso>(this.listaCursos);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private cursoService: CursoService, private routerAct: ActivatedRoute, private router: Router) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarCursos();
  }
  registrarCurso(){
    this.router.navigateByUrl('admin/cursos/crearCurso');
  }
  cargarCursos() {
    this.cursoService.getCurso().subscribe(resp =>{
      this.listaCursos = resp;
      this.dataSource.data = this.listaCursos;
    })
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

  eliminarCurso(idCurso: number){
    this.cursoService.eliminarCurso(idCurso).subscribe( data =>{
      this.listaCursos = this.listaCursos.filter(c => c!== idCurso);
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
      this.cargarCursos();
    })
  }

  actualizarCurso(idCurso: number){
    this.router.navigate(['/admin/cursos/editarCurso/', idCurso]);
  }

}
