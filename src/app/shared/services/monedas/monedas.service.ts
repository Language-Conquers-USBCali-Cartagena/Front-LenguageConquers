import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Monedas } from '../../models/monedas';

@Injectable({
  providedIn: 'root'
})
export class MonedasService {

  constructor(private http:HttpClient) { }
  getMoneda(): Observable<Monedas[]> {
    return this.http.get<Monedas[]>(`${environment.endpoint}/monedas`)
  }

  crearMoneda(moneda: Monedas): Observable<string>{
    return this.http.post(`${environment.endpoint}/monedas`, moneda,{ responseType: 'text'});
  }

  consultarPorId(idMoneda: number){
    return this.http.get<Monedas>(`${environment.endpoint}/monedas/porId/${idMoneda}`);
  }

  actualizarMoneda(moneda: Monedas): Observable<string>{
    return this.http.put(`${environment.endpoint}/monedas/actualizarMoneda`,moneda,{ responseType: 'text'});
  }

  eliminarMonedas(idMoneda: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/monedas/eliminarMoneda/${idMoneda}`,{ responseType: 'text'});
  }
}
