import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Estudiante } from '../../../shared/models/estudiante';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Curso } from '../../../shared/models/curso';

@Injectable({
  providedIn: 'root'
})
export class EstudianteServiceService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.endpoint;

  getEstudiante(email: string): Observable<Estudiante>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });
    return this.http.get<Estudiante>(`${this.baseUrl}/estudiante/porCorrero`, {params: paramsHttp});
  }

  getCursos(email: string): Observable<Curso[]>{
    let paramHttp = new HttpParams({
      fromObject: {
        correoEstudiante: `${email}`
      }
    });
    return this.http.get<Curso[]>(`${this.baseUrl}/curso/porCorreoEstudiante`, {params: paramHttp});
  }
}
