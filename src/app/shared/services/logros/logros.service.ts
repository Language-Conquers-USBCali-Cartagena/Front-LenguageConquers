import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logros } from '../../models/logros';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  constructor(private http:HttpClient) { }

  getLogros():Observable<Logros[]>{
    return this.http.get<Logros[]>(`${environment.endpoint}/logro`)
  }

  crearLogro(logro: Logros): Observable<string>{
    return this.http.post(`${environment.endpoint}/logro/guardarLogro`, logro,{ responseType: 'text'});
  }

  consultarPorId(idLogro: number){
    return this.http.get<Logros>(`${environment.endpoint}/logro/porId/${idLogro}`);
  }

  actualizarLogro(logro: Logros): Observable<string>{
    return this.http.put(`${environment.endpoint}/logro/actualizarLogro`,logro,{ responseType: 'text'});
  }

  eliminarLogro(idLogro: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/logro/eliminarLogro/${idLogro}`,{ responseType: 'text'});
  }
  cantidadLogros():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/logro/cantidadLogros`);
  }

}
