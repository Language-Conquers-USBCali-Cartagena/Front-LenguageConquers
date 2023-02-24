import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../models/curso';
import { PalabrasReservadas } from '../../models/palabrasReservadas';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class PalabraReservadaService {

    constructor(private http:HttpClient){}

    getPalabrasReservadas(): Observable<PalabrasReservadas[]>{
        return this.http.get<PalabrasReservadas[]>(`${environment.endpoint}/palabrasReservadas`);
    }

    procesarPalabras(palabras: PalabrasReservadas[]): Observable<string>{
        return this.http.post(`${environment.endpoint}/palabrasReservadas/respuesta`, palabras,{ responseType: 'text'});
    }
  }