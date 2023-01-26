import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelMision } from 'src/app/shared/models/nivelMision';
import { NivelMisionService } from 'src/app/shared/services/nivelMision/nivel-mision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nivel-mision',
  templateUrl: './nivel-mision.component.html',
  styleUrls: ['./nivel-mision.component.css']
})
export class NivelMisionComponent implements OnInit {

  listaNivelMisiones: NivelMision[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'puntajeMinimo','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<NivelMision>(this.listaNivelMisiones);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private nivelMisionService: NivelMisionService, private router: Router, private routerAct: ActivatedRoute) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarNivelMision();
  }
  registrarNivelMision(){
    this.router.navigateByUrl('admin/nivel-mision/crearNivelMision')
  }
  cargarNivelMision(){
    this.nivelMisionService.getNivelMision().subscribe(resp =>{
      this.listaNivelMisiones = resp;
      this.dataSource.data = this.listaNivelMisiones;
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

  eliminarNivelMision(idNivelMision:number){
    this.nivelMisionService.eliminarNivelMision(idNivelMision).subscribe(data =>{
      this.listaNivelMisiones = this.listaNivelMisiones.filter(c => c!== idNivelMision);
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
      this.cargarNivelMision();
    })
  }

  actualizarNivelMision(idNivelMision: number) {
    this.router.navigate(['/admin/nivel-mision/editarNivelMision/', idNivelMision]);
  }



}
