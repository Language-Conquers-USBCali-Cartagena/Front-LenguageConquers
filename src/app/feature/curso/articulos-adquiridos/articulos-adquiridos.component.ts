import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { ArticulosAdquiridosService } from 'src/app/shared/services/articulosAdquiridos/articulos-adquiridos.service';

@Component({
  selector: 'app-articulos-adquiridos',
  templateUrl: './articulos-adquiridos.component.html',
  styleUrls: ['./articulos-adquiridos.component.css']
})
export class ArticulosAdquiridosComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(articulosAdquiridosService: ArticulosAdquiridosService, private router: Router) { }

  ngOnInit(): void {
  }
  irMapa(){
    this.router.navigate(['/curso/mapa/1']);
  }

}
