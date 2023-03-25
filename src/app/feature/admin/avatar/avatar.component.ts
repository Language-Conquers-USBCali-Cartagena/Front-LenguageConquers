import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import Swal from 'sweetalert2';
import { Avatar } from '../../../shared/models/avatar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css'],
  providers: [DatePipe]
})
export class AvatarComponent implements OnInit {

  listaAvatares: Avatar[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'imagenAvatar','usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource= new MatTableDataSource<Avatar>(this.listaAvatares);
  id: string | null | undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  constructor(private avatarService: AvatarService, private routerAct: ActivatedRoute, private router: Router,  private datePipe: DatePipe) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.cargarAvatares();
  }
  cargarAvatares() {
    this.avatarService.getAvatar().subscribe(resp=>{
      this.listaAvatares = resp;
      this.dataSource.data = this.listaAvatares;
    });
  }
  registrarAvatar(){
    this.router.navigateByUrl('admin/avatar/crearAvatar');
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

  eliminarAvatar(idAvatar:number){
    this.avatarService.eliminarAvatar(idAvatar).subscribe( data => {
      this.listaAvatares = this.listaAvatares.filter(c=> c!== idAvatar);
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
      this.cargarAvatares();
    });


  }

  actualizarAvatar(idAvatar:number){
    this.router.navigate(['/admin/avatar/editarAvatar/',idAvatar]);
  }

  formatDate(dateString: string | null | undefined): string {
    if (!dateString) {
      return '';
    }
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'dd-MM-yyyy')!;
  }

}
