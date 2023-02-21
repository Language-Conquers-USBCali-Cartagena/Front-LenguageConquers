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
  irDasboard(){
    this.router.navigateByUrl('/admin/home')
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
    this.router.navigateByUrl('/admin/nivel-mision/listar')
  }
  irTipoMision(){
    this.router.navigateByUrl('/admin/tipo-mision/listar')
  }
  irLogros(){
    this.router.navigateByUrl('/admin/logros/listar-logros')
  }
  irArticulos(){
    this.router.navigateByUrl('/admin/articulos/listar-articulos')
  }
  irCategorias(){
    this.router.navigateByUrl('/admin/categoria-articulos/listar')
  }
  irAvatares(){
    this.router.navigateByUrl('/admin/avatar/listar-avatar')
  }
  irRoles(){

  }
  irMonedas(){
    this.router.navigateByUrl('/admin/monedas/listar-monedas')
  }
  irEstados(){
    this.router.navigateByUrl('/admin/estado/listar-estados')
  }
  irPrograma(){
    this.router.navigateByUrl('/admin/programa/listar-programa')
  }
  irCursos(){
    this.router.navigateByUrl('/admin/cursos/listar-cursos')
  }

}
