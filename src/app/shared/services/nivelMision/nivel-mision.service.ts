import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NivelMision } from '../../models/nivelMision';

@Injectable({
  providedIn: 'root'
})
export class NivelMisionService {

  constructor(private http:HttpClient) { }
  getNivelMision():Observable<NivelMision[]>{
    return this.http.get<NivelMision[]>(`${environment.endpoint}/nivelMision`)
  }
}
