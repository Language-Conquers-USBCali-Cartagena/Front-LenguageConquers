import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estado } from 'src/app/shared/models/estado';

@Component({
  selector: 'app-habilitar-reto',
  templateUrl: './habilitar-reto.component.html',
  styleUrls: ['./habilitar-reto.component.css']
})
export class HabilitarRetoComponent implements OnInit {

  form!: FormGroup;
  estados:Estado[] = [];
  constructor(private fb: FormBuilder) { }


  ngOnInit(): void {
  }
  atras(){

  }
  actualizar(){
    
  }

}
