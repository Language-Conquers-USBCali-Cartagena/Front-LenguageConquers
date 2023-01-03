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

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Programa>(`${URL}/Id/${id}`);
  }

}
