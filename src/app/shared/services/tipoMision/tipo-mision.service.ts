import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoMision } from '../../models/tipoMision';

@Injectable({
  providedIn: 'root'
})
export class TipoMisionService {

  constructor(private http:HttpClient) { }
  getTipoMision():Observable<TipoMision[]>{
    return this.http.get<TipoMision[]>(`${environment.endpoint}/tipoMision`)
  }

  crearTipoMision(tipoMision: TipoMision){
    return this.http.post<TipoMision>(`${environment.endpoint}/tipoMision`, tipoMision);
  }

  consultarPorId(idTipoMision: number){
    return this.http.get<TipoMision>(`${environment.endpoint}/tipoMision/porId/${idTipoMision}`);
  }

  actualizarTipoMision(tipoMision: TipoMision): Observable<TipoMision>{
    return this.http.put<TipoMision>(`${environment.endpoint}/tipoMision/actualizarTipoMision`,tipoMision);
  }

  eliminarTipoMision(tipoMision: TipoMision): Observable<TipoMision>{
    return this.http.delete<TipoMision>(`${environment.endpoint}/tipoMision/eliminarTipoMision/${tipoMision.idTipoMision}`);
  }
}
