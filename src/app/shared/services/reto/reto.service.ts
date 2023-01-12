import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reto } from '../../models/reto';

@Injectable({
  providedIn: 'root'
})
export class RetoService {

  constructor(private http:HttpClient) { }
  getReto():Observable<Reto[]>{
    return this.http.get<Reto[]>(`${environment.endpoint}/retos`)
  }

  crearReto(reto: Reto){
    return this.http.post<Reto>(`${environment.endpoint}/retos`, reto);
  }

  consultarPorId(idReto: number){
    return this.http.get<Reto>(`${environment.endpoint}/retos/porId/${idReto}`);
  }

  actualizarReto(reto: Reto): Observable<Reto>{
    return this.http.put<Reto>(`${environment.endpoint}/retos/actualizarReto`,reto);
  }

  eliminarReto(reto: Reto): Observable<Reto>{
    return this.http.delete<Reto>(`${environment.endpoint}/retos/eliminarReto/${reto.idReto}`);
  }
}
