import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CursoEstudiante } from '../../models/cursoEstudiante';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CursoEstudianteService {

  constructor(private http:HttpClient) { }


  registrarCursoEstudiante(cursoEstudiante: CursoEstudiante): Observable<string>{
    return this.http.post(`${environment.endpoint}/cursoEstudiante/crearCursoEstudiante`, cursoEstudiante, {responseType: 'text'});
  }

  getCursoEstudiante(idEstudiante: number, idCurso: number): Observable<CursoEstudiante>{
    let paramsHttp= new HttpParams({
      fromObject: {
        idEstudiante: idEstudiante,
        idCurso: idCurso
      }
    });
    return this.http.get(`${environment.endpoint}/cursoEstudiante/porEstudianteyCurso`, {params: paramsHttp});
  }

  cantidadEstudiantesMatriculados(idCurso: number): Observable<number>{
    let paramsHttp = new HttpParams({
      fromObject: {
       idCurso: `${idCurso}`
      }
    });
    return this.http.get<number>(`${environment.endpoint}/cursoEstudiante/cantidadEstudiantesMatriculados`, {params: paramsHttp});
  }
}
