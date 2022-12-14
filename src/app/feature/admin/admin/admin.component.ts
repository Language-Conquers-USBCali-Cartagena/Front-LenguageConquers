import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router: Router) { }
  ngOnInit(): void {

  }
  irUsuarios(){
    this.router.navigateByUrl('/admin/usuarios/listar-usuarios')
  }
  irReto(){
    this.router.navigateByUrl('/admin/reto/listar-retos')
  }
  irMisiones(){
    this.router.navigateByUrl('/admin/misiones/listar-misiones')
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
