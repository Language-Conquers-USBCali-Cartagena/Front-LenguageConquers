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


  crearEstado(estado: Estado): Observable<string>{
    return this.http.post(`${environment.endpoint}/estados/guardarEstado`, estado,{ responseType: 'text'});
  }

  consultarPorId(idEstado: number){
    return this.http.get<Estado>(`${environment.endpoint}/estados/porId/${idEstado}`);
  }

  actualizarEstado(estado: Estado): Observable<string>{
    return this.http.put(`${environment.endpoint}/estados/actualizarEstado`,estado,{ responseType: 'text'});
  }

  eliminarEstado(idEstado: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/estados/eliminarEstado/${idEstado}`,{ responseType: 'text'});
  }


}
