import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import { LogrosService } from 'src/app/shared/services/logros/logros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logros',
  templateUrl: './logros.component.html',
  styleUrls: ['./logros.component.css']
})
export class LogrosComponent implements OnInit {


  listaLogros: Logros[] = [];
  displayedColumns: string[] = ['id', 'imagenLogro', 'nombre','descripción',  'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<Logros>(this.listaLogros);
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private logrosService: LogrosService, private routerAct: ActivatedRoute, private router: Router ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarLogros();
  }

  cargarLogros() {
    this.logrosService.getLogros().subscribe(result =>{
      this.listaLogros = result;
      this.dataSource.data = this.listaLogros;
    });
  }
  registrarLogros(){
    this.router.navigateByUrl('admin/logros/Crearlogros')
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

  eliminarLogro(idLogro: number){
    this.logrosService.eliminarLogro(idLogro).subscribe(data =>{
      this.listaLogros = this.listaLogros.filter(c => c!== idLogro);
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
      this.cargarLogros();
    });

  }

  actualizarLogro(idLogro: number){
    this.router.navigate(['/admin/logros/editarLogro/', idLogro]);
  }


}
