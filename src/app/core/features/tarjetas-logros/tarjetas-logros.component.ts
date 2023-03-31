import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Logros } from 'src/app/shared/models/logros';
import { LogrosService } from 'src/app/shared/services/logros/logros.service';
import { Estudiante } from '../../../shared/models/estudiante';

@Component({
  selector: 'app-tarjetas-logros',
  templateUrl: './tarjetas-logros.component.html',
  styleUrls: ['./tarjetas-logros.component.css']
})
export class TarjetasLogrosComponent implements OnInit {


  listaLogros: Logros[]=[];
  listaLogrosObtenidos: Logros[] = [];
  idLogros: number = 0;
  constructor( 
    private logrosService: LogrosService, 
    private sanitizer: DomSanitizer
    ) {}


  ngOnInit(): void {
    let usuario: Estudiante = JSON.parse(String(localStorage.getItem('usuario')));
    let id: number = usuario.idEstudiante!;
    this.cargarLogrosObtenidos(id);
    this.cargarLogros(id);
  }
  cargarLogros(id: number){
    this.logrosService.getLogrosNoObtenidos(id).subscribe(result => {this.listaLogros = result});
  }
  cargarLogrosObtenidos(id: number){
    this.logrosService.getlogrosObtenidos(id).subscribe(result => {
      this.listaLogrosObtenidos = result});
  }

  public getSantizeUrl(url : string) {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,'+ url);
}

}

