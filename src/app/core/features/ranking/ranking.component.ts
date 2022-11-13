import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';

export interface PeriodicElement {
  nombre: string;
  avatar: string;
  nivel: number;
  puntaje: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {avatar: '1', nombre: 'Camila', nivel: 2, puntaje: 400},
  {avatar: '2', nombre: 'Andres', nivel: 1, puntaje: 380},
  {avatar: '3', nombre: 'Luis', nivel: 1, puntaje: 375},


];
@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  estudiante: Estudiante = {};
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  
  constructor() { }

  ngOnInit(): void {
  }

}
