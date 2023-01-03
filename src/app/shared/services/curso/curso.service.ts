import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  constructor(private http:HttpClient) { }
  getCurso():Observable<Curso[]>{
    return this.http.get<Curso[]>(`${environment.endpoint}/curso`)
  }

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Curso>(`${URL}/Id/${id}`);
  }
}
