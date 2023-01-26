import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categorias } from '../../models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private http: HttpClient) { }
  getCategoria(): Observable<Categorias[]>{
    return this.http.get<Categorias[]>(`${environment.endpoint}/categoria`)
  }
  crearCategoria(categorias: Categorias): Observable<string>{
    return this.http.post(`${environment.endpoint}/categoria/guardarCategoria`, categorias,{ responseType: 'text'});
  }

  consultarPorId(idCategorias: number){
    return this.http.get<Categorias>(`${environment.endpoint}/categoria/porId/${idCategorias}`);
  }

  actualizarCategorias(categorias: Categorias): Observable<string>{
    return this.http.put(`${environment.endpoint}/categoria/actualizarCategoria`,categorias,{ responseType: 'text'});
  }

  eliminarCategorias(idCategoria: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/categoria/eliminarCategoria/${idCategoria}`,{ responseType: 'text'});
  }
}
