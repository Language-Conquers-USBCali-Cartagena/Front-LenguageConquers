import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { EstudianteServiceService } from '../../estudiante/services/estudiante-service.service';
import Swal from 'sweetalert2';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { Avatar } from 'src/app/shared/models/avatar';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  estudiante: Estudiante = {};
  usuario: string = '';
  isSideNavCollapsed=false;
  screenWidth = 0;
  form!: FormGroup;
  nickname: string | undefined ="";
  nombre: string | undefined = "";
  puntuacion: number | undefined= 0;
  monedas:number| undefined =0;
  avatar!: Avatar;
  idAvatar: number =0;
  imgAvatar :string ="";



  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private router: Router, private estudianteService: EstudianteServiceService,private  estudianteServiceNormal: EstudianteService,private fb: FormBuilder, private avatarService: AvatarService) { }

  ngOnInit(): void {
    this.obtenerEstudiante();
    this.getAvatarPorid();
  }

  setEstudiante(estudiante: Estudiante){
    this.form = this.fb.group({
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      nickName: estudiante.nickName,
      puntaje: estudiante.puntaje
    });
  }
 obtenerEstudiante() {
  let usuarioResp: Estudiante = JSON.parse(String(localStorage.getItem("usuario")));
  this.setEstudiante(usuarioResp);
  this.idAvatar = Number(usuarioResp.idAvatar);
  this.monedas = usuarioResp.monedasObtenidas;
  this.nickname = usuarioResp.nickName;
  this.puntuacion = usuarioResp.puntaje;
  this.nombre = usuarioResp.nombre;
}

getAvatarPorid(){
  this.avatarService.consultarPorId(this.idAvatar).subscribe(resultado =>{
    this.avatar = resultado
    this.imgAvatar = String(this.avatar.imgAvatar);
  });
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
  home(){
    this.router.navigate(['/estudiante/menu']);
  }
}
