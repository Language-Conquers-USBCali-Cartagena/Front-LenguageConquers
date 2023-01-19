import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Monedas } from 'src/app/shared/models/monedas';
import { MonedasService } from 'src/app/shared/services/monedas/monedas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-monedas',
  templateUrl: './monedas.component.html',
  styleUrls: ['./monedas.component.css']
})
export class MonedasComponent implements OnInit {

  listaMonedas: Monedas[] = [];
  displayedColumns: string[] = ['id', 'cantidad', 'imagenMoneda', 'usuarioCreador', 'fechaCreacion', 'usuarioModificador', 'fechaModificacion', 'Acciones'];
  dataSource = new MatTableDataSource<Monedas>(this.listaMonedas);
  id!: string | null;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private monedaService: MonedasService,private routerAct: ActivatedRoute, private router: Router  ) {
    this.id = this.routerAct.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.cargarMonedas();
  }
  registrarMoneda(){
    this.router.navigateByUrl('admin/monedas/crearMoneda');
  }
  cargarMonedas() {
    this.monedaService.getMoneda().subscribe(result =>{
      this.listaMonedas = result;
      this.dataSource.data = this.listaMonedas;
    })
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

  eliminarMoneda(idMoneda: Monedas){
    this.monedaService.eliminarMonedas(idMoneda).subscribe(result =>{
      this.listaMonedas = this.listaMonedas.filter(c => c!== idMoneda);
    });
    this.cargarMonedas();
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
      title: 'La moneda fue eliminada exitosamente.'
    });

  }

  actualizarMoneda(idMoneda:number){
    this.router.navigate(['/admin/monedas/editarMoneda/',idMoneda]);
  }


}
