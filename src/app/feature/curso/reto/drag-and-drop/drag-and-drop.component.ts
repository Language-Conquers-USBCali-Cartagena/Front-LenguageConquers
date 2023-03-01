import { CdkDragDrop, copyArrayItem,  moveItemInArray,
  transferArrayItem,CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Respuestas } from 'src/app/shared/models/opciones';
import { PalabraReservadaService } from '../../../../shared/services/palabraReservada/palabraReservada.service';
import { PalabrasReservadas } from '../../../../shared/models/palabrasReservadas';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {

  palabras: PalabrasReservadas[] = [];
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

  constructor(private router: Router, private palabraService: PalabraReservadaService) { }

  async ngOnInit() {
    await this.ObtenetPalabras();
  }
  ObtenetPalabras(){
    this.palabraService.getPalabrasReservadas().subscribe(data => {
      this.palabras = data;
    });
  }

  //-----------------------------------------
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
  reto(): void {
    this.router.navigate(['../curso/ide/1/1'])
  }

  //-------------------------
  ejecutar(){
    this.organizar(this.a, 1);
    this.organizar(this.b, 2);
    this.organizar(this.c, 3)
    this.organizar(this.d, 4);
    this.organizar(this.e, 5);
    this.organizar(this.f, 6);
    this.organizar(this.g, 7);
    this.organizar(this.h, 8);
    this.organizar(this.i, 9);
    this.organizar(this.j, 10);

    let resp: PalabrasReservadas[] = this.a.concat(this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.j);
    resp.forEach(resp => { console.log(resp);
    })
    // this.palabraService.procesarPalabras(resp).subscribe(resp =>{
    //   console.log(resp);

    // });

  }

  organizar(lista: PalabrasReservadas[], numeroLista: number){
    for(let i = 0; i < lista.length; i ++){

      lista[i].orden = i +1;
      lista[i].lista = numeroLista;
      console.log(lista[i].nombre + ' ' + lista[i].orden + ' ' + lista[i].lista);

    }
  }

}
