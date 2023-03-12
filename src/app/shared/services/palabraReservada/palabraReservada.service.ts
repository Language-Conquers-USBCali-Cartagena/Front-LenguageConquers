import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../../models/curso';
import { PalabrasReservadas } from '../../models/palabrasReservadas';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
  })
  export class PalabraReservadaService {

    constructor(private http:HttpClient){}

    getPalabrasReservadas(retoId: number): Observable<PalabrasReservadas[]>{
      const params = new HttpParams().set('idReto', retoId);
        return this.http.get<PalabrasReservadas[]>(`${environment.endpoint}/palabrasReservadas/palabras-por-reto`, {params});
    }

    procesarPalabras(palabras: PalabrasReservadas[]): Observable<string>{
        return this.http.post(`${environment.endpoint}/palabrasReservadas/respuesta`, palabras,{ responseType: 'text'});
    }
  }