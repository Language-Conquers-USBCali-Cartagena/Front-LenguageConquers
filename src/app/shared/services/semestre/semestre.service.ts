import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semestre } from '../../models/semestre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  constructor(private http: HttpClient) { }

  getSemestre(): Observable<Semestre[]>{
    return this.http.get<Semestre[]>(`${environment.endpoint}/semestre`)
  }

  crearSemestre(semestre: Semestre){
    return this.http.post<Semestre>(`${environment.endpoint}/semestre/guardarSemestre`, semestre);
  }

  consultarPorId(idSemestre: number){
    return this.http.get<Semestre>(`${environment.endpoint}/semestre/porId/${idSemestre}`);
  }

  actualizarSemestre(semestre: Semestre): Observable<Semestre>{
    return this.http.put<Semestre>(`${environment.endpoint}/semestre/actualizarSemestre/${semestre.idSemestre}`,semestre);
  }

  eliminarSemestre(semestre: Semestre): Observable<Semestre>{
    return this.http.delete<Semestre>(`${environment.endpoint}/semestre/eliminarSemestre/${semestre.idSemestre}`);
  }
}
