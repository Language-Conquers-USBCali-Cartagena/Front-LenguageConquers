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
  crearCategoria(categorias: Categorias){
    return this.http.post<Categorias>(`${environment.endpoint}/categoria/guardarCategoria`, categorias);
  }

  consultarPorId(idCategorias: number){
    return this.http.get<Categorias>(`${environment.endpoint}/categoria/porId/${idCategorias}`);
  }

  actualizarCategorias(categorias: Categorias): Observable<Categorias>{
    return this.http.put<Categorias>(`${environment.endpoint}/categoria/actualizarCategoria`,categorias);
  }

  eliminarCategorias(categorias: Categorias): Observable<Categorias>{
    return this.http.delete<Categorias>(`${environment.endpoint}/categoria/eliminarCategoria/${categorias.idCategoria}`);
  }
}
