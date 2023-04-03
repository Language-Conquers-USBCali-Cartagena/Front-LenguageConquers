import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/shared/models/estudiante';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { Avatar } from 'src/app/shared/models/avatar';
import { Reto } from 'src/app/shared/models/reto';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';
import { error } from 'console';
import { RetoEstudiante } from 'src/app/shared/models/retoEstudiante';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {


  estudiante: Estudiante = {};
  usuario: string = '';
  form!: FormGroup;
  nickname: string | undefined = "";
  nombre: string | undefined = "";
  puntuacion: number | undefined = 0;
  monedas: number | undefined = 0;
  avatar!: Avatar;
  idAvatar: number = 0;
  imgAvatar: string = "";
  retos: Reto[] = []



  constructor(
    private router: Router, 
    private fb: FormBuilder, 
    private avatarService: AvatarService,
    private retoService: RetoService,
    private retoEstudianteService: RetoEstudianteService
    ) { }

  async ngOnInit() {
    this.obtenerEstudiante();
    await this.cargarRetos();
    this.getAvatarPorid();
  }

  setEstudiante(estudiante: Estudiante) {
    this.form = this.fb.group({
      idEstudiante: estudiante.idEstudiante,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      nickName: estudiante.nickName,
      puntaje: estudiante.puntaje
    });
  }
  redireccion(idReto: number | undefined){
    this.retoEstudianteService.porRetoyEstudiante(idReto!, this.estudiante.idEstudiante!).subscribe((resp) => {
      let retoEstudiante: RetoEstudiante = resp;
      
      if(retoEstudiante.idEstado != 1){
        Swal.fire({
          icon: "info",
          title: 'Reto terminado',
          text: 'El reto ya fue finalizado'
        });
      }else{
        this.router.navigate(['estudiante/curso/ide', idReto!])
      }
    }, error => {
      Swal.fire({
        icon: "error",
        title: 'Ups...',
        text: error.error
      });
    });
  }
  cargarRetos(){
    this.retoService.retosPorEstudiante(this.estudiante.idEstudiante!).subscribe((resp) => {
      
      this.retos = resp;
    }, error => {
    })
  }
  obtenerEstudiante() {
    this.estudiante = JSON.parse(String(localStorage.getItem("usuario")));
    this.setEstudiante(this.estudiante);
    this.idAvatar = Number(this.estudiante.idAvatar);
    this.monedas = this.estudiante.monedasObtenidas;
    this.nickname = this.estudiante.nickName;
    this.puntuacion = this.estudiante.puntaje;
    this.nombre = this.estudiante.nombre;
  }

  getAvatarPorid() {
    this.avatarService.consultarPorId(this.idAvatar).subscribe(resultado => {
      this.avatar = resultado
      this.imgAvatar = String(this.avatar.imgAvatar);
    });
  }


  verTutorial() {
    Swal.fire({
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false,
      backdrop: '',
    })
  }

  articulosAdquiridos() {
    this.router.navigate(['/estudiante/articulos-adquiridos']);
  }
  home() {
    this.router.navigate(['/estudiante/menu']);
  }
}
