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

  crearGenero(genero: Genero): Observable<string>{
    return this.http.post(`${environment.endpoint}/genero/guardarGenero`, genero,{ responseType: 'text'});
  }

  consultarPorId(idGenero: number){
    return this.http.get<Genero>(`${environment.endpoint}/genero/porId/${idGenero}`);
  }

  actualizarGenero(genero: Genero): Observable<string>{
    return this.http.put(`${environment.endpoint}/genero/actualizarGenero/${genero.idGenero}`,genero,{ responseType: 'text'});
  }

  eliminarGenero(idGenero: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/genero/eliminarGenero/${idGenero}`,{ responseType: 'text'});
  }
}
