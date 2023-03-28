import { HttpClient, HttpParams } from '@angular/common/http';
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

  rankingEstudiantes():Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>(`${environment.endpoint}/estudiante/rankingEstudiante`);
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
  existEstudianteByCorreo(email: String): Observable<boolean>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });

    return this.http.get<boolean>(`${environment.endpoint}/estudiante/existePorCorreo`, {params: paramsHttp});
  }
  getEstudiantePorCorreo(correo: string): Observable<Estudiante>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${correo}`
      }
    });
    return this.http.get<Estudiante>(`${environment.endpoint}/estudiante/porCorrero`, {params: paramsHttp});
  }

  cantidadEstudiantes():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/estudiante/cantidadEstudiante`);
  }

  monedasGanadasPromedio():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/estudiante/promedioMonedasEstudiantes`);
  }



}
