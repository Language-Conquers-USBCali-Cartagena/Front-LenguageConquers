import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuarios } from 'src/app/shared/models/usuarios';
import { UsuariosService } from 'src/app/shared/services/usuarios/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  listaUsuarios: Usuarios[] = []
  displayedColumns: string[] = ['Id', 'Nombre', 'Apellidos', 'Correo', 'Acciones'];
  dataSource!: MatTableDataSource<Usuarios>;
  id: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private usuarioService: UsuariosService, private routerAct: ActivatedRoute, private router: Router) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  registrarseDocente(){
    this.router.navigateByUrl('admin/usuarios/crearDocente');

  }
  registrarseEstudiante(){
    this.router.navigateByUrl('admin/usuarios/crearEstudiante');
  }
  cargarUsuarios(){
    //this.listaUsuarios = this.usuarioService.getCliente();
    this.dataSource = new MatTableDataSource(this.listaUsuarios);
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


  eliminarUsuario(index:number){
    //this.usuarioService.eliminarUsuario(index);
    this.cargarUsuarios();

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
      title: 'El usuario fue eliminado  exitosamente.'
    })

  }
}


