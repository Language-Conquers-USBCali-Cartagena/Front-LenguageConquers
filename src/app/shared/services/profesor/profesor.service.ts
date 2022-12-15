import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesor } from '../../models/profesor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  constructor(private http:HttpClient) { }
  getProfesor(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${environment.endpoint}/profesor`)
  }
}
