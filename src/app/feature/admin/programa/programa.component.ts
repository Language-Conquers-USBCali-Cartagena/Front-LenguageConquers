import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Programa } from 'src/app/shared/models/programa';
import { ProgramaService } from 'src/app/shared/services/programa/programa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-programa',
  templateUrl: './programa.component.html',
  styleUrls: ['./programa.component.css']
})
export class ProgramaComponent implements OnInit {

  listaProgramas: Programa[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<Programa>(this.listaProgramas);
  id: string | null | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private programaService: ProgramaService,private routerAct: ActivatedRoute, private router: Router) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarProgramas();
  }
  registrarPrograma(){
    this.router.navigateByUrl('admin/programa/crearPrograma');
  }
  cargarProgramas() {
    this.programaService.getProgramas().subscribe(data =>{
      this.listaProgramas = data;
      this.dataSource.data = this.listaProgramas;
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

  eliminarPrograma(idPrograma: number){
    this.programaService.eliminarPrograma(idPrograma).subscribe(data=>{
      this.listaProgramas = this.listaProgramas.filter(c => c!== idPrograma);
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
      this.cargarProgramas();
    });
  }

  actualizarPrograma(idPrograma: number){
    this.router.navigate(['/admin/programa/editarPrograma/', idPrograma]);
  }



}
