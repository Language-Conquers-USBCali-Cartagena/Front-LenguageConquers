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

  crearCurso(curso: Curso){
    return this.http.post<Curso>(`${environment.endpoint}/curso/guardarCurso`, curso);
  }

  consultarPorId(idCurso: number){
    return this.http.get<Curso>(`${environment.endpoint}/curso/porId/${idCurso}`);
  }

  actualizarCurso(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${environment.endpoint}/curso/actualizarCurso/${curso.idCurso}`,curso);
  }

  eliminarCurso(curso: Curso): Observable<Curso>{
    return this.http.delete<Curso>(`${environment.endpoint}/curso/eliminarCurso/${curso.idCurso}`);
  }


}
