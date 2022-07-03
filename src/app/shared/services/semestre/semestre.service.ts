import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semestre } from '../../models/semestre';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {

  constructor(private http: HttpClient) { }

  getSemestre(): Observable<Semestre[]>{
    return this.http.get<Semestre[]>(`${environment.endpoint}/semestre`)
  }
}
