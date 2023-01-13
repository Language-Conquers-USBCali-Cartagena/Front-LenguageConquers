import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../../models/programa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient) { }

  getProgramas(): Observable<Programa[]>{
    return this.http.get<Programa[]>(`${environment.endpoint}/programa`)
  }

  crearPrograma(programa: Programa){
    return this.http.post<Programa>(`${environment.endpoint}/programa/guardarPrograma`, programa);
  }

  consultarPorId(idPrograma: number){
    return this.http.get<Programa>(`${environment.endpoint}/programa/porId/${idPrograma}`);
  }

  actualizarPrograma(programa: Programa): Observable<Programa>{
    return this.http.put<Programa>(`${environment.endpoint}/programa/actualizarPrograma`,programa);
  }

  eliminarPrograma(programa: Programa): Observable<Programa>{
    return this.http.delete<Programa>(`${environment.endpoint}/programa/eliminarPrograma/${programa.idPrograma}`);
  }

}
