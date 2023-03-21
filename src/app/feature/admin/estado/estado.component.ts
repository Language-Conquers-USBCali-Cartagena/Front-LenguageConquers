import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Estado } from 'src/app/shared/models/estado';
import { EstadoService } from 'src/app/shared/services/estado/estado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado',
  templateUrl: './estado.component.html',
  styleUrls: ['./estado.component.css'],
  providers: [DatePipe]
})
export class EstadoComponent implements OnInit {

  listaEstados: Estado[] = [];
  displayedColumns: string[] = ['id', 'estado','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<Estado>(this.listaEstados);
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private estadoService: EstadoService, private routerAct: ActivatedRoute, private router: Router,  private datePipe: DatePipe) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarEstados();
  }
  registrarEstado(){
    this.router.navigateByUrl('admin/estado/crearEstado');
  }
  cargarEstados() {
    this.estadoService.getEstados().subscribe(resp =>{
      this.listaEstados = resp;
      this.dataSource.data = this.listaEstados;
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

  eliminarEstado(idEstado: number){
    this.estadoService.eliminarEstado(idEstado).subscribe(data=>{
      this.listaEstados = this.listaEstados.filter(c => c!== idEstado);
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
      this.cargarEstados();
    });
  }

  actualizarEstado(idEstado: number){
    this.router.navigate(['/admin/estado/editarEstado/', idEstado]);
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }


}
