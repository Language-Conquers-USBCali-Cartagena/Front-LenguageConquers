import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nivel-ide',
  templateUrl: './nivel-ide.component.html',
  styleUrls: ['./nivel-ide.component.css']
})
export class NivelIDEComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.mostrarPistas();
  }
  atras(){
    this.router.navigateByUrl('curso/mapa/1');
  }
  mostrarTutorial(){
    Swal.fire({
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

  mostrarPistas(){
    Swal.fire({
      title: 'Sweet!',
      text: 'Aqui va el texto de explicación',
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: 'Custom image',
    })
  }

  realizarReto(){
    Swal.fire({
      title: 'Sweet!',
      text: 'Aqui va el texto de explicación',
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

}
