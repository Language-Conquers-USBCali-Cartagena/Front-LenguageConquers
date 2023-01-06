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

  crearGenero(genero: Genero){
    return this.http.post<Genero>(`${environment.endpoint}/genero/guardarGenero`, genero);
  }

  consultarPorId(idGenero: number){
    return this.http.get<Genero>(`${environment.endpoint}/genero/porId/${idGenero}`);
  }

  actualizarGenero(genero: Genero): Observable<Genero>{
    return this.http.put<Genero>(`${environment.endpoint}/genero/actualizarGenero/${genero.idGenero}`,genero);
  }

  eliminarGenero(genero: Genero): Observable<Genero>{
    return this.http.delete<Genero>(`${environment.endpoint}/genero/eliminarGenero/${genero.idGenero}`);
  }
}
