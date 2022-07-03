import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../../models/estudiante';
import { environment } from '../../../../environments/environment';
import { Profesor } from '../../models/profesor';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiciosLoginService {

  

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.endpoint;
  existEstudianteByCorreo(email: String): Observable<boolean>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });

    return this.http.get<boolean>(`${this.baseUrl}/estudiante/existePorCorreo`, {params: paramsHttp});
  }
  existProfesorByCorreo(email: String): Observable<boolean>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });

    return this.http.get<boolean>(`${this.baseUrl}/profesor/existePorCorreo`, {params: paramsHttp}).pipe(map(response => response));
  }

  createEstudiante(estudiante: Estudiante): Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/estudiante`, estudiante);
  }

  createProfesor(profesor: Profesor): Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/profesor/registrarProfesor`, profesor);
  }
}
