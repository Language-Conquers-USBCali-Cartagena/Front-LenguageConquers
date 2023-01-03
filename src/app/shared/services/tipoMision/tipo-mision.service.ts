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

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<TipoMision>(`${URL}/Id/${id}`);
  }
}
