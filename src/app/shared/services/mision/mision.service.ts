import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mision } from '../../models/mision';

@Injectable({
  providedIn: 'root'
})
export class MisionService {

  constructor(private http:HttpClient) { }
  getMision():Observable<Mision[]>{
    return this.http.get<Mision[]>(`${environment.endpoint}/mision`)
  }

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Mision>(`${URL}/Id/${id}`);
  }

}
