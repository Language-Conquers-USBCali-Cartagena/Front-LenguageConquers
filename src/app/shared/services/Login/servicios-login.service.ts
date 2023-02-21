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

    return this.http.get<boolean>(`${this.baseUrl}/profesor/existePorCorreo`, {params: paramsHttp});
  }

  createEstudiante(estudiante: Estudiante): Observable<string>{
    return this.http.post(`${this.baseUrl}/estudiante/crearEstudiante`, estudiante,{ responseType: 'text'});
  }

  createProfesor(profesor: Profesor): Observable<string>{
    return this.http.post(`${this.baseUrl}/profesor/registrarProfesor`, profesor,{ responseType: 'text'});
  }
  getEstudiante(email: string): Observable<Estudiante>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });
    return this.http.get<Estudiante>(`${this.baseUrl}/estudiante/porCorrero`, {params: paramsHttp});
  }
  getProfesor(email: string): Observable<Profesor>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });
    return this.http.get<Profesor>(`${this.baseUrl}/profesor/porCorreo`, {params: paramsHttp})
  }
}
