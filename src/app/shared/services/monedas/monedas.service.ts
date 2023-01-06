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
    return this.http.get<Monedas[]>(`${environment.endpoint}/moneda`)
  }

  crearMoneda(moneda: Monedas){
    return this.http.post<Monedas>(`${environment.endpoint}/moneda/guardarMoneda`, moneda);
  }

  consultarPorId(idMoneda: number){
    return this.http.get<Monedas>(`${environment.endpoint}/moneda/porId/${idMoneda}`);
  }

  actualizarMoneda(moneda: Monedas): Observable<Monedas>{
    return this.http.put<Monedas>(`${environment.endpoint}/moneda/actualizarMoneda/${moneda.idMonedas}`,moneda);
  }

  eliminarMonedas(moneda: Monedas): Observable<Monedas>{
    return this.http.delete<Monedas>(`${environment.endpoint}/moneda/eliminarMoneda/${moneda.idMonedas}`);
  }
}
