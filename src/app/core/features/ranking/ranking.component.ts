import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { RankingTable } from 'src/app/shared/models/tablaRanking';
import { Avatar } from '../../../shared/models/avatar';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  estudiante: Estudiante = {};
  listaEstudiantes: Estudiante[] = [];
  primerEstudiante!: Estudiante ;
  segundoEstudiante!: Estudiante;
  tercerEstudiante!: Estudiante;
  displayedColumns: string[] = ['Avatar', 'NickName', 'Nombre','Apellido','Puntaje', 'MonedasAdquiridas'];
  dataSource =  new MatTableDataSource<Estudiante>(this.listaEstudiantes);
  usuarioResp!: Estudiante;
  imgAvatar!: string;
  idAvatar: number | undefined;


  constructor(private avatarService: AvatarService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.ranking();


  }

  ranking(){
    this.estudianteService.rankingEstudiantes().subscribe(data =>{
      data.sort((a,b) => b.puntaje! - a.puntaje!);
      this.listaEstudiantes = data;
      this.primerEstudiante = this.listaEstudiantes[0];
    this.segundoEstudiante = this.listaEstudiantes[1];
    this.tercerEstudiante = this.listaEstudiantes[2];
      for (let i = 0; i < this.listaEstudiantes.length; i++) {
        const estudiante = this.listaEstudiantes[i];
        this.avatarService.consultarPorId(estudiante.idAvatar!).subscribe(avatar => {
          estudiante.imagenAvatar = avatar.imgAvatar;
        });
      }

      this.dataSource.data = this.listaEstudiantes.slice(3);


    })
  }

}
