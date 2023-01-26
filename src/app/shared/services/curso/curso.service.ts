import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http:HttpClient) { }

  getCurso():Observable<Curso[]>{
    return this.http.get<Curso[]>(`${environment.endpoint}/curso`)
  }

  crearCurso(curso: Curso): Observable<string>{
    return this.http.post(`${environment.endpoint}/curso/registrarCurso`, curso,{ responseType: 'text'});
  }

  consultarPorId(idCurso: number){
    return this.http.get<Curso>(`${environment.endpoint}/curso/porId/${idCurso}`);
  }

  actualizarCurso(curso: Curso): Observable<string>{
    return this.http.put(`${environment.endpoint}/curso/actualizarCurso`,curso,{ responseType: 'text'});
  }

  eliminarCurso(idCurso: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/curso/eliminarCurso/${idCurso}`,{ responseType: 'text'});
  }


}
