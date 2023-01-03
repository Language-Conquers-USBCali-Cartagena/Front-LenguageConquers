import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Logros } from '../../models/logros';

@Injectable({
  providedIn: 'root'
})
export class LogrosService {

  constructor(private http:HttpClient) { }

  getLogros():Observable<Logros[]>{
    return this.http.get<Logros[]>(`${environment.endpoint}/logro`)
  }

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Logros>(`${URL}/Id/${id}`);
  }

}
