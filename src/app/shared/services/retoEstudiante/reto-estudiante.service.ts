import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RetoEstudiante } from '../../models/retoEstudiante';

@Injectable({
  providedIn: 'root'
})
export class RetoEstudianteService {

  constructor(private http:HttpClient) { }

  listarRetoEstudiante():Observable<RetoEstudiante[]>{
    return this.http.get<RetoEstudiante[]>(`${environment.endpoint}/retoEstudiante`)
  }

  listarRetoEstudiantePorId(idRetoEstudiante: number){
    return this.http.get<RetoEstudiante>(`${environment.endpoint}/retoEstudiante/porId/${idRetoEstudiante}`)
  }

  listarPorIdEstudiante(idEstudiante: number){
    return this.http.get<RetoEstudiante>(`${environment.endpoint}/retoEstudiante/porIdEstudiante/${idEstudiante}`)
  }

  listarPorIdReto(idReto: number){
    return this.http.get<RetoEstudiante>(`${environment.endpoint}/retoEstudiante/porIdReto/${idReto}`)
  }

  crearRetoEstudiante(retoEstudiante: RetoEstudiante):Observable<string>{
    return this.http.post(`${environment.endpoint}/retoEstudiante/crearRetoEstudiante`, retoEstudiante,{ responseType: 'text'});
  }

  actualizarRetoEstudiante(retoEstudiante: RetoEstudiante): Observable<string>{
    return this.http.put(`${environment.endpoint}/retoEstudiante/actualizarRetoEstudiante`, retoEstudiante,{ responseType: 'text'});
  }

  eliminarRetoEstudiante(idRetoEstudiante: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/retoEstudiante/eliminarRetoEstudiante/${idRetoEstudiante}`,{ responseType: 'text'})
  }

  promedioRetos():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/retoEstudiante/promedioRetosCompletados`);
  }
}
