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

  crearEstudiante(estudiante: Estudiante): Observable<string>{
    return this.http.post(`${environment.endpoint}/estudiante/crearEstudiante`, estudiante,{ responseType: 'text'});
  }

  consultarPorId(idEstudiante: number){
    return this.http.get<Estudiante>(`${environment.endpoint}/estudiante/porId/${idEstudiante}`);
  }

  actualizarEstudiante(estudiante: Estudiante): Observable<string>{
    return this.http.put(`${environment.endpoint}/estudiante/actualizarEstudiante`,estudiante,{ responseType: 'text'});
  }

  eliminarEstudiante(idEstudiante: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/estudiante/eliminarEstudiante/${idEstudiante}`,{ responseType: 'text'});
  }
}
