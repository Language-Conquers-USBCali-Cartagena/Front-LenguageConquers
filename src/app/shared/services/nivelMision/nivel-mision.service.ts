import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelMision } from '../../models/nivelMision';

@Injectable({
  providedIn: 'root'
})
export class NivelMisionService {

  constructor(private http:HttpClient) { }
  getNivelMision():Observable<NivelMision[]>{
    return this.http.get<NivelMision[]>(`${environment.endpoint}/nivelMision`)
  }


  crearNivelMision(nivelMision: NivelMision){
    return this.http.post<NivelMision>(`${environment.endpoint}/nivelMision`, nivelMision);
  }

  consultarPorId(idNivelMision: number){
    return this.http.get<NivelMision>(`${environment.endpoint}/nivelMision/porId/${idNivelMision}`);
  }

  actualizarNivelMision(nivelMision: NivelMision): Observable<NivelMision>{
    return this.http.put<NivelMision>(`${environment.endpoint}/nivelMision/actualizarNivelMision`,nivelMision);
  }

  eliminarNivelMision(nivelMision: NivelMision): Observable<NivelMision>{
    return this.http.delete<NivelMision>(`${environment.endpoint}/nivelMision/eliminarNivelMision/${nivelMision.idNivelMision}`);
  }
}
