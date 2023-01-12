import { HttpClient } from '@angular/common/http';
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

  crearProfesor(profesor: Profesor){
    return this.http.post<Profesor>(`${environment.endpoint}/profesor/registrarProfesor`, profesor);
  }

  consultarPorId(idProfesor: number){
    return this.http.get<Profesor>(`${environment.endpoint}/profesor/porId/${idProfesor}`);
  }

  actualizarProfesor(profesor: Profesor): Observable<Profesor>{
    return this.http.put<Profesor>(`${environment.endpoint}/profesor/actualizarProfesor/${profesor.idProfesor}`,profesor);
  }

  eliminarProfesor(profesor: Profesor): Observable<Profesor>{
    return this.http.delete<Profesor>(`${environment.endpoint}/profesor/eliminarProfesor/${profesor.idProfesor}`);
  }
}
