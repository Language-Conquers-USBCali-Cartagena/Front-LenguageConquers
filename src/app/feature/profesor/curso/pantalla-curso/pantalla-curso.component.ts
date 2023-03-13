import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pantalla-curso',
  templateUrl: './pantalla-curso.component.html',
  styleUrls: ['./pantalla-curso.component.css']
})
export class PantallaCursoComponent implements OnInit {

  isRetoLista = true;
  isConfigReto = false;
  isEstudiantes = false;


  constructor() { }

  ngOnInit(): void {
  }
  listaRetos(){
    this.isRetoLista = true;
    this.isConfigReto= false;
    this.isEstudiantes = false;
  }
  configurarRetos(){
    this.isConfigReto = true;
    this.isEstudiantes = false;
    this.isRetoLista = false;
  }

  misEstudiantes(){
    this.isEstudiantes = true;
    this.isConfigReto= false;
    this.isRetoLista = false;
  }

}
