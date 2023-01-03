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

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Monedas>(`${URL}/Id/${id}`);
  }
}
