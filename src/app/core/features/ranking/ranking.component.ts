import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { RankingTable } from 'src/app/shared/models/tablaRanking';
import { Avatar } from '../../../shared/models/avatar';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';


const ELEMENT_DATA: RankingTable [] = [
  {avatar: '1', nickname: 'Camila', nombre: 'Camila',apellidos:'Acosta', puntaje: 400, monedasAdquiridas:200},
  {avatar: '2', nickname: 'Andres',  nombre: 'Camila',apellidos:'Acosta',  puntaje: 380, monedasAdquiridas:200},
  {avatar: '3', nickname: 'Luis',  nombre: 'Camila',apellidos:'Acosta', puntaje: 375, monedasAdquiridas:200},

];
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  estudiante: Estudiante = {};
  displayedColumns: string[] = ['Avatar', 'NickName', 'Nombre','Apellido','Puntaje', 'MonedasAdquiridas'];
  dataSource = ELEMENT_DATA;
  usuarioResp!: Estudiante;
  imgAvatar!: string;

  constructor(private avatarService: AvatarService) { }

  ngOnInit(): void {
    this.obtenerEstudiante();
    this.setAvatar();
  }
  obtenerEstudiante(){
    this.usuarioResp= JSON.parse(String(localStorage.getItem("usuario")));
    console.log(this.usuarioResp.idAvatar);
  }
  setAvatar(){
    this.avatarService.consultarPorId(this.usuarioResp.idAvatar!).subscribe(data =>{
      this.imgAvatar = String(data.imgAvatar);
    })
  }

}
