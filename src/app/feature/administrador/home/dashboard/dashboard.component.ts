import { Component, OnInit } from '@angular/core';
import { MatMenuPanel } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  irUsuarios(){
    this.router.navigateByUrl('/usuarios')
  }
  irReto(){

  }
  irMisiones(){

  }
  irNivelMision(){

  }
  irTipoMision(){

  }
  irLogros(){

  }
  irArticulos(){
    this.router.navigateByUrl('/articulos/lista-articulos')

  }
  irCategorias(){

  }
  irAvatares(){

  }
  irRoles(){

  }
  irMonedas(){

  }
  irEstados(){

  }
  irPrograma(){

  }
  irCursos(){

  }



}
