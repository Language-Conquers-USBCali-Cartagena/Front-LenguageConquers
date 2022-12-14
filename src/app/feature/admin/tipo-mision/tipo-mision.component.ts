import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoMision } from 'src/app/shared/models/tipoMision';
import { TipoMisionService } from 'src/app/shared/services/tipoMision/tipo-mision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-mision',
  templateUrl: './tipo-mision.component.html',
  styleUrls: ['./tipo-mision.component.css']
})
export class TipoMisionComponent implements OnInit {

  listaTipoMision: TipoMision[] = [];
  displayedColumns: string[] = ['id','descripción','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource!: MatTableDataSource<TipoMision>;
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private tipoMisionService: TipoMisionService,private routerAct: ActivatedRoute, private router: Router  ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarTipoMision();
  }
  registrarTipoMision(){
    this.router.navigateByUrl('admin/tipo-mision/crearTipoMision');
  }
  cargarTipoMision(){
    this.dataSource = new MatTableDataSource(this.listaTipoMision);
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

  eliminarTipoMision(index:number){
    this.cargarTipoMision();

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
    })

    Toast.fire({
      icon: 'success',
      title: 'El Tipo Misión fue eliminado exitosamente'
    })

  }



}
