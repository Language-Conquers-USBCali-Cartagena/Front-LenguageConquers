import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor } from '../../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http:HttpClient) { }
  getProfesor(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${environment.endpoint}/profesor`)
  }

  crearProfesor(profesor: Profesor): Observable<string>{
    return this.http.post(`${environment.endpoint}/profesor/registrarProfesor`, profesor,{ responseType: 'text'});
  }

  consultarPorId(idProfesor: number){
    return this.http.get<Profesor>(`${environment.endpoint}/profesor/porId/${idProfesor}`);
  }

  actualizarProfesor(profesor: Profesor): Observable<string>{
    return this.http.put(`${environment.endpoint}/profesor/actualizarProfesor`,profesor,{ responseType: 'text'});
  }

  eliminarProfesor(idProfesor: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/profesor/eliminarProfesor/${idProfesor}`,{ responseType: 'text'});
  }
  cantidadProfesores():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/profesor/cantidadProfesores`);
  }
  getProfesorPorCorreo(email: string): Observable<Profesor>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });
    return this.http.get<Profesor>(`${environment.endpoint}/profesor/porCorreo`, {params: paramsHttp});
  }
}
