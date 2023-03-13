import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Reto } from 'src/app/shared/models/reto';
import { RetoService } from 'src/app/shared/services/reto/reto.service';


@Component({
  selector: 'app-lista-retos',
  templateUrl: './lista-retos.component.html',
  styleUrls: ['./lista-retos.component.css']
})
export class ListaRetosComponent implements OnInit {

  listaRetos: Reto[] = []
  displayedColumns: string[] = [ 'nombre',  'intentos', 'fechaInicio', 'fechaLimite','monedas', 'idEstado', 'Acciones'];
  dataSource = new MatTableDataSource<Reto>(this.listaRetos);
  id: string | null |undefined;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;



  constructor(private retoService: RetoService, private routerAct: ActivatedRoute, private router: Router ) {
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

}
