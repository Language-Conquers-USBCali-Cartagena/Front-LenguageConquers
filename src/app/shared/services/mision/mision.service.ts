import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mision } from '../../models/mision';

@Injectable({
  providedIn: 'root'
})
export class MisionService {

  constructor(private http:HttpClient) { }
  getMision():Observable<Mision[]>{
    return this.http.get<Mision[]>(`${environment.endpoint}/mision`)
  }

  crearMision(mision: Mision){
    return this.http.post<Mision>(`${environment.endpoint}/mision/guardarMision`, mision);
  }

  consultarPorId(idMision: number){
    return this.http.get<Mision>(`${environment.endpoint}/mision/porId/${idMision}`);
  }

  actualizarMision(mision: Mision): Observable<Mision>{
    return this.http.put<Mision>(`${environment.endpoint}/mision/actualizarMision/${mision.idMision}`,mision);
  }

  eliminarMision(mision: Mision): Observable<Mision>{
    return this.http.delete<Mision>(`${environment.endpoint}/mision/eliminarMision/${mision.idMision}`);
  }

}
