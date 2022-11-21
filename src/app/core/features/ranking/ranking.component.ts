import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { RankingTable } from 'src/app/shared/models/tablaRanking';


const ELEMENT_DATA: RankingTable [] = [
  {avatar: '1', nickname: 'Camila', nivel: 2, puntaje: 400},
  {avatar: '2', nickname: 'Andres', nivel: 1, puntaje: 380},
  {avatar: '3', nickname: 'Luis', nivel: 1, puntaje: 375},

];
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  estudiante: Estudiante = {};
  displayedColumns: string[] = ['Avatar', 'NickName', 'Nivel', 'Puntaje'];
  dataSource = ELEMENT_DATA;


  constructor() { }

  ngOnInit(): void {
  }

}
