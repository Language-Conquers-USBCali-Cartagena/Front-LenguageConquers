import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Estado } from '../../models/estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  constructor(private http: HttpClient) { }

  getEstados(): Observable<Estado[]>{
    return this.http.get<Estado[]>(`${environment.endpoint}/estados`)
  }


  crearEstado(estado: Estado){
    return this.http.post<Estado>(`${environment.endpoint}/estado/guardarEstado`, estado);
  }

  consultarPorId(idEstado: number){
    return this.http.get<Estado>(`${environment.endpoint}/estado/porId/${idEstado}`);
  }

  actualizarEstado(estado: Estado): Observable<Estado>{
    return this.http.put<Estado>(`${environment.endpoint}/estado/actualizarEstado/${estado.idEstado}`,estado);
  }

  eliminarEstado(estado: Estado): Observable<Estado>{
    return this.http.delete<Estado>(`${environment.endpoint}/estado/eliminarEstado/${estado.idEstado}`);
  }


}
