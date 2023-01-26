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

  crearTipoMision(tipoMision: TipoMision): Observable<string>{
    return this.http.post(`${environment.endpoint}/tipoMision`, tipoMision,{ responseType: 'text'});
  }

  consultarPorId(idTipoMision: number){
    return this.http.get<TipoMision>(`${environment.endpoint}/tipoMision/porId/${idTipoMision}`);
  }

  actualizarTipoMision(tipoMision: TipoMision): Observable<string>{
    return this.http.put(`${environment.endpoint}/tipoMision/actualizarTipoMision`,tipoMision,{ responseType: 'text'});
  }

  eliminarTipoMision(idTipoMision: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/tipoMision/eliminarTipoMision/${idTipoMision}`,{ responseType: 'text'});
  }
}
