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

  crearMoneda(moneda: Monedas){
    return this.http.post<Monedas>(`${environment.endpoint}/monedas`, moneda);
  }

  consultarPorId(idMoneda: number){
    return this.http.get<Monedas>(`${environment.endpoint}/monedas/porId/${idMoneda}`);
  }

  actualizarMoneda(moneda: Monedas): Observable<Monedas>{
    return this.http.put<Monedas>(`${environment.endpoint}/monedas/actualizarMoneda`,moneda);
  }

  eliminarMonedas(moneda: Monedas): Observable<Monedas>{
    return this.http.delete<Monedas>(`${environment.endpoint}/monedas/eliminarMoneda/${moneda.idMoneda}`);
  }
}
