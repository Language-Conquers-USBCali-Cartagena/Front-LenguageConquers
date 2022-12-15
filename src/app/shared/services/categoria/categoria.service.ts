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
}
