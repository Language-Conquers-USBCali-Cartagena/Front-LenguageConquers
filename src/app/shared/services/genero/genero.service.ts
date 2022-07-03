import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genero } from '../../models/genero';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(private http:HttpClient) { }

  getGenero(): Observable<Genero[]>{
    return this.http.get<Genero[]>(`${environment.endpoint}/genero`)
  }
}
