import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carussel-avatares',
  templateUrl: './carussel-avatares.component.html',
  styleUrls: ['./carussel-avatares.component.css']
})
export class CarusselAvataresComponent implements OnInit {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() { }

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../../../assets/images/avatar/avatar1.png',
    };
    this.slides[1] = {
      src: '../../../../assets/images/avatar/avatar2.png',
    }
    this.slides[2] = {
      src: '../../../../assets/images/avatar/avatar1.png',
    }
  }

}
