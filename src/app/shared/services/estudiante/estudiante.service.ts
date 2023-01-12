import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../../models/estudiante';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  constructor(private http:HttpClient) { }

  getEstudiante():Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${environment.endpoint}/estudiante`)
  }

  crearEstudiante(estudiante: Estudiante){
    return this.http.post<Estudiante>(`${environment.endpoint}/estudiante/crearEstudiante`, estudiante);
  }

  consultarPorId(idEstudiante: number){
    return this.http.get<Estudiante>(`${environment.endpoint}/estudiante/porId/${idEstudiante}`);
  }

  actualizarEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(`${environment.endpoint}/estudiante/actualizarEstudiante/${estudiante.idEstudiante}`,estudiante);
  }

  eliminarEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.delete<Estudiante>(`${environment.endpoint}/estudiante/eliminarEstudiante/${estudiante.idEstudiante}`);
  }
}
