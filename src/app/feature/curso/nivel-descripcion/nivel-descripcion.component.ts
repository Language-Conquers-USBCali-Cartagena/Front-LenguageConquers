import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-nivel-descripcion',
  templateUrl: './nivel-descripcion.component.html',
  styleUrls: ['./nivel-descripcion.component.css']
})
export class NivelDescripcionComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  atras(): void {
    this.router.navigate(['../curso/mapa/1'])
  }
  reto(): void {
    this.router.navigate(['../curso/ide/1/1'])
  }
  pasarIzq(): void {}
  pasarDer(): void{}

}
