import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Programa } from '../../models/programa';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  constructor(private http: HttpClient) { }

  getProgramas(): Observable<Programa[]>{
    return this.http.get<Programa[]>(`${environment.endpoint}/programa`)
  }

  crearPrograma(programa: Programa): Observable<string>{
    return this.http.post(`${environment.endpoint}/programa/guardarPrograma`, programa,{ responseType: 'text'});
  }

  consultarPorId(idPrograma: number){
    return this.http.get<Programa>(`${environment.endpoint}/programa/porId/${idPrograma}`);
  }

  actualizarPrograma(programa: Programa): Observable<string>{
    return this.http.put(`${environment.endpoint}/programa/actualizarPrograma`,programa,{ responseType: 'text'});
  }

  eliminarPrograma(idPrograma: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/programa/eliminarPrograma/${idPrograma}`,{ responseType: 'text'});
  }

}
