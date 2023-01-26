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

  crearSemestre(semestre: Semestre): Observable<string>{
    return this.http.post(`${environment.endpoint}/semestre/guardarSemestre`, semestre,{ responseType: 'text'});
  }

  consultarPorId(idSemestre: number){
    return this.http.get<Semestre>(`${environment.endpoint}/semestre/porId/${idSemestre}`);
  }

  actualizarSemestre(semestre: Semestre): Observable<string>{
    return this.http.put(`${environment.endpoint}/semestre/actualizarSemestre/${semestre.idSemestre}`,semestre,{ responseType: 'text'});
  }

  eliminarSemestre(idSemestre: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/semestre/eliminarSemestre/${idSemestre}`,{ responseType: 'text'});
  }
}
