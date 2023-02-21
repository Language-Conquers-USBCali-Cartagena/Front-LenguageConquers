import { CdkDragDrop, copyArrayItem,  moveItemInArray,
  transferArrayItem,CdkDrag } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Respuestas } from 'src/app/shared/models/opciones';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  /*
  palabras: Respuestas[] = [
    {name: "Llevar cocos"},
    {name: "Bajar Cocos"},
    {name:"Treparse en la palmera"}
  ];
  listaRespuesta:Respuestas[] = [
    {
      name:"otra"
    }
  ];
*/
  palabras = ["llevar cocos", "Bajar cocos", "Subir a la palmera", "Pelar los cocos",
  "Partir el coco", "beber agua del coco"];
  listaRespuesta = ["terminar"];


  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  //-----------------------------------------
  drop(event: CdkDragDrop<string[]>) {
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
  a = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  b = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  c = ['Hola'];
  d = ['B'];
  e = ['g'];
  f = ['o'];
  g = ['o'];
  h = ['o'];
  pal = ['cortar', 'escalar']

}
