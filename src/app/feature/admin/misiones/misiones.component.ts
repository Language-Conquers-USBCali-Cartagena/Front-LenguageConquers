import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Mision } from 'src/app/shared/models/mision';
import { Reto } from 'src/app/shared/models/reto';
import { CursoService } from 'src/app/shared/services/curso/curso.service';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import { NivelMisionService } from 'src/app/shared/services/nivelMision/nivel-mision.service';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { TipoMisionService } from 'src/app/shared/services/tipoMision/tipo-mision.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-misiones',
  templateUrl: './misiones.component.html',
  styleUrls: ['./misiones.component.css']
})
export class MisionesComponent implements OnInit {

  listaMisiones: Mision[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'idNivelMisión', 'idTipoMisión', 'idCurso', 'idMonedas', 'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource!: MatTableDataSource<Reto>;
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private retoService: RetoService, private nivelMisionService: NivelMisionService, private tipoMisionService: TipoMisionService, private cursoService: CursoService, private monedasService: MonedasService, private router: Router, private routerAct: ActivatedRoute) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarMisiones();
  }
  registrarMision(){
    this.router.navigateByUrl('admin/misiones/creaMisiones');
  }
  cargarMisiones(){
    this.dataSource = new MatTableDataSource(this.listaMisiones);
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
  eliminarMision(index:number){
    //this.usuarioService.eliminarUsuario(index);
    this.cargarMisiones();

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
      title: 'La Misión fue eliminada exitosamente'
    })

  }


}
