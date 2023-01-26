import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelMision } from '../../models/nivelMision';
import { Text } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NivelMisionService {

  constructor(private http:HttpClient) { }
  getNivelMision():Observable<NivelMision[]>{
    return this.http.get<NivelMision[]>(`${environment.endpoint}/nivelMision`)
  }


  crearNivelMision(nivelMision: NivelMision): Observable<string>{
    return this.http.post(`${environment.endpoint}/nivelMision`, nivelMision,{ responseType: 'text'});
  }

  consultarPorId(idNivelMision: number){
    return this.http.get<NivelMision>(`${environment.endpoint}/nivelMision/porId/${idNivelMision}`);
  }

  actualizarNivelMision(nivelMision: NivelMision): Observable<string>{
     return this.http.put(`${environment.endpoint}/nivelMision/actualizarNivelMision`, nivelMision,{ responseType: 'text'});
  }

  eliminarNivelMision(idNivelMision: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/nivelMision/eliminarNivelMision/${idNivelMision}`,{ responseType: 'text'});
  }
}
