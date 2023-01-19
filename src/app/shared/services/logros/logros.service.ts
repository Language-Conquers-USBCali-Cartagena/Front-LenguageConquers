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

  crearLogro(logro: Logros){
    return this.http.post<Logros>(`${environment.endpoint}/logro/guardarLogro`, logro);
  }

  consultarPorId(idLogro: number){
    return this.http.get<Logros>(`${environment.endpoint}/logro/porId/${idLogro}`);
  }

  actualizarLogro(logro: Logros): Observable<Logros>{
    return this.http.put<Logros>(`${environment.endpoint}/logro/actualizarLogro`,logro);
  }

  eliminarLogro(logro: Logros): Observable<Logros>{
    return this.http.delete<Logros>(`${environment.endpoint}/logro/eliminarLogro/${logro.idLogro}`);
  }

}
