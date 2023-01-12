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
    return this.http.get<Mision[]>(`${environment.endpoint}/misiones`)
  }

  crearMision(mision: Mision){
    return this.http.post<Mision>(`${environment.endpoint}/misiones`, mision);
  }

  consultarPorId(idMision: number){
    return this.http.get<Mision>(`${environment.endpoint}/misiones/porId/${idMision}`);
  }

  actualizarMision(mision: Mision): Observable<Mision>{
    return this.http.put<Mision>(`${environment.endpoint}/misiones/actualizarMision`,mision);
  }

  eliminarMision(mision: Mision): Observable<Mision>{
    return this.http.delete<Mision>(`${environment.endpoint}/misiones/eliminarMision/${mision.idMision}`);
  }

}
