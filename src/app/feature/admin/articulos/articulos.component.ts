import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Articulo } from 'src/app/shared/models/articulos';
import { ArticuloService } from 'src/app/shared/services/articulo/articulo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos',
  templateUrl: './articulos.component.html',
  styleUrls: ['./articulos.component.css']
})
export class ArticulosComponent implements OnInit {

  listaArticulos: Articulo[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripción', 'precio', 'nivelValido','imagenArticulo', 'idCategoria', 'idEstado', 'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<Articulo>(this.listaArticulos);
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private articulosService: ArticuloService, private routerAct: ActivatedRoute, private router: Router) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarArticulos();
  }
  registrarArticulo(){
    this.router.navigateByUrl('admin/articulos/crearArticulo');
  }
  cargarArticulos() {
    this.articulosService.getArticulo().subscribe(resp =>{
      this.listaArticulos = resp;
      this.dataSource.data = this.listaArticulos;
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

  eliminarArticulo(idArticulo : Articulo){
    this.articulosService.eliminarArticulo(idArticulo).subscribe(data =>{
      this.listaArticulos = this.listaArticulos.filter(c => c!== idArticulo);
    });
    this.cargarArticulos();
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
      title: 'El artículo fue eliminado exitosamente.'
    });
  }

  actualizarArticulo(idArticulo:number){
    this.router.navigate(['/admin/articulos/editarArticulo/',idArticulo]);
  }

}
