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


  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Estado>(`${URL}/Id/${id}`);
  }


}
