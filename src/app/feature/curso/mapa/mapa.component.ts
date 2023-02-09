import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { EstudianteServiceService } from '../../estudiante/services/estudiante-service.service';
import Swal from 'sweetalert2';


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

  verTutorial(){
    Swal.fire({
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

  articulosAdquiridos(){
    this.router.navigate(['/curso/articulosAdquiridos']);
  }
}
