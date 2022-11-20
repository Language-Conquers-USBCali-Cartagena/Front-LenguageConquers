import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tarjetas-logros',
  templateUrl: './tarjetas-logros.component.html',
  styleUrls: ['./tarjetas-logros.component.css']
})
export class TarjetasLogrosComponent implements OnInit {

  pagina: number = 0;
  //logros: Logros[]=[];
  idLogros: number = 0;
  form: UntypedFormGroup;
  constructor(private fb: UntypedFormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  pasarIzq(): void {}
  pasarDer(): void{}
}

