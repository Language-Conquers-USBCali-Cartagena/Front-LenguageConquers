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

  crearMision(mision: Mision): Observable<string>{
    return this.http.post(`${environment.endpoint}/misiones`, mision,{ responseType: 'text'});
  }

  consultarPorId(idMision: number){
    return this.http.get<Mision>(`${environment.endpoint}/misiones/porId/${idMision}`);
  }

  actualizarMision(mision: Mision): Observable<string>{
    return this.http.put(`${environment.endpoint}/misiones/actualizarMision`,mision,{ responseType: 'text'});
  }

  eliminarMision(idMision: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/misiones/eliminarMision/${idMision}`,{ responseType: 'text'});
  }

}
