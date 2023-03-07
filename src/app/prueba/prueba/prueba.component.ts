import { Component, OnInit } from '@angular/core';
import { PalabrasReservadas } from '../../shared/models/palabrasReservadas';
import { Router } from '@angular/router';
import { PalabraReservadaService } from '../../shared/services/palabraReservada/palabraReservada.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.component.html',
  styleUrls: ['./prueba.component.css']
})
export class PruebaComponent implements OnInit {

  constructor(private router: Router, private palabraService: PalabraReservadaService) { }

  ngOnInit(): void {
  }

  palabras: PalabrasReservadas[] = [{categoria: 'fwe', fechaCreacion: new Date, fechaModificacion: new Date, idPalabraReservada: 1, lista: 0, nombre: 'wefw', orden: 0, padre: 0, tiempo: 0, usuarioCreador: 'sdfw', usuarioModificador: 'dfwe'}];
  a: PalabrasReservadas[] = [];
  b: PalabrasReservadas[] = [];
  c: PalabrasReservadas[] = [];
  d: PalabrasReservadas[] = [];
  e: PalabrasReservadas[] = [];
  f: PalabrasReservadas[] = [];
  g: PalabrasReservadas[] = [];
  h: PalabrasReservadas[] = [];
  i: PalabrasReservadas[] = [];
  j: PalabrasReservadas[] = [];


  drop(event: CdkDragDrop<PalabrasReservadas[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
