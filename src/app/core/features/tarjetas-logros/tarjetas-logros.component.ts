import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Logros } from 'src/app/shared/models/logros';
import { LogrosService } from 'src/app/shared/services/logros/logros.service';

@Component({
  selector: 'app-tarjetas-logros',
  templateUrl: './tarjetas-logros.component.html',
  styleUrls: ['./tarjetas-logros.component.css']
})
export class TarjetasLogrosComponent implements OnInit {


  listaLogros: Logros[]=[];
  idLogros: number = 0;
  constructor( private logrosService: LogrosService, private sanitizer: DomSanitizer) {

  }


  ngOnInit(): void {
    this.cargarLogros();
  }
  cargarLogros(){
    this.logrosService.getLogros().subscribe(result => {this.listaLogros = result});
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ url);
}

}

