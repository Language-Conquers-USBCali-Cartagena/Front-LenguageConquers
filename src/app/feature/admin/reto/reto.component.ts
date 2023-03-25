import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Reto } from 'src/app/shared/models/reto';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reto',
  templateUrl: './reto.component.html',
  styleUrls: ['./reto.component.css'],
  providers: [DatePipe]
})
export class RetoComponent implements OnInit {

  listaRetos: Reto[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripcion', 'intentos', 'fechaInicio', 'fechaLimite', 'solucion','monedas','idMision', 'idEstado', 'idCurso','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Reto>(this.listaRetos);
  id: string | null |undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private retoService: RetoService,private routerAct: ActivatedRoute, private router: Router, private datePipe: DatePipe ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarRetos();
  }

  cargarRetos(){
    this.retoService.getReto().subscribe(resp =>{
      this.listaRetos = resp;
      this.dataSource.data = this.listaRetos;
    });
  }
  registrarReto(){
    this.router.navigateByUrl('admin/reto/crearReto');
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

  eliminarReto(idReto:number){
    this.retoService.eliminarReto(idReto).subscribe(data =>{
      this.listaRetos = this.listaRetos.filter(c => c!== idReto);
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
      this.cargarRetos();
    });
  }

  actualizarReto(idReto:number){
    this.router.navigate(['/admin/reto/editarReto/',idReto]);
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }


}
