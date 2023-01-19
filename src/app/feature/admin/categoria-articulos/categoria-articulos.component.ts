import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorias } from 'src/app/shared/models/categoria';
import { CategoriaService } from 'src/app/shared/services/categoria/categoria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-articulos',
  templateUrl: './categoria-articulos.component.html',
  styleUrls: ['./categoria-articulos.component.css']
})
export class CategoriaArticulosComponent implements OnInit {

  listaCategoria: Categorias[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'descripción',  'idEstado', 'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Categorias>(this.listaCategoria);
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private categoriaService: CategoriaService, private routerAct: ActivatedRoute, private router: Router ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarCategoria();
  }
  cargarCategoria() {
    this.categoriaService.getCategoria().subscribe(resp =>{
      this.listaCategoria = resp;
      this.dataSource.data = this.listaCategoria;
    });
  }
  registrarCategoria(){
    this.router.navigateByUrl('admin/categoria-articulos/crearCategoria');
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

  eliminarCategoria(idCategoria: Categorias){
    this.categoriaService.eliminarCategorias(idCategoria).subscribe(data =>{
      this.listaCategoria = this.listaCategoria.filter(c => c!== idCategoria);
    })
    this.cargarCategoria();
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
      title: 'La categoría fue eliminada exitosamente.'
    });
  }

  actualizarCategoria(idCategoria: number){
    this.router.navigate(['admin/categoria-articulos/actualizarCategoria/', idCategoria]);
  }



}
