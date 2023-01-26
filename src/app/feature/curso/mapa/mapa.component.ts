import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { EstudianteServiceService } from '../../estudiante/services/estudiante-service.service';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  estudiante: Estudiante = {};
  correo: string = '';
  isSideNavCollapsed=false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private router: Router, private estudianteService: EstudianteServiceService) { }

  ngOnInit(): void {
    this.correo = localStorage.getItem("correo")!;
    this.obtenerEstudiante(this.correo);
  }

  async obtenerEstudiante(correo: string) {
    await this.estudianteService.getEstudiante(correo).toPromise().then((response) => {
      localStorage.setItem("usuario", JSON.stringify(response));
      this.estudiante = response;
    }
    )

  }
  reto1(){
    this.router.navigateByUrl('/descripcion/1/1');
  }

}
