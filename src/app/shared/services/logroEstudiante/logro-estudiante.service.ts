import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogroEstudianteService {

  constructor(private http:HttpClient) { }

  ahorrador(idEstudiante: number):Observable<string>{
    let httpParms = new HttpParams({
      fromObject: {
        idEstudiante: idEstudiante
      }
    })
    return this.http.get(`${environment.endpoint}/logroEstudiante/ahorrador`, {responseType: 'text', params: httpParms});
  }

  comprador(idEstudiante: number):Observable<string>{
    let httpParms = new HttpParams({
      fromObject: {
        idEstudiante: idEstudiante
      }
    })
    return this.http.get(`${environment.endpoint}/logroEstudiante/comprador`, {responseType: 'text', params: httpParms});
  }

  perfeccionista(idEstudiante: number, idReto: number):Observable<string>{
    let httpParms = new HttpParams({
      fromObject: {
        idEstudiante: idEstudiante,
        idReto: idReto
      }
    })
    return this.http.get(`${environment.endpoint}/logroEstudiante/perfeccionista`, {responseType: 'text', params: httpParms});
  }  
}
