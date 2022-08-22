import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/shared/models/estudiante';



@Component({
  selector: 'app-perfil-estudiante',
  templateUrl: './perfil-estudiante.component.html',
  styleUrls: ['./perfil-estudiante.component.css']
})
export class PerfilEstudianteComponent implements OnInit {

  estudiante: Estudiante = {};
  materialGrids = [
    {text: '1st Cell : 2 column and 1 row', cols: 2, rows: 1, color: '#FBEC39'},
    {text: '3rd Cell : 1 column and 1 row', cols: 1, rows: 1, color: '#A4ACDA'},
    {text: 'Fourth Cell : 1 column and 1 row', cols: 1, rows: 1, color: '#88CCCC'},
  ];
  constructor() { }

  ngOnInit(): void {
  }


}
