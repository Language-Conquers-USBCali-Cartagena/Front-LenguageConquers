import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Articulo } from '../../models/articulos';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {

  constructor(private http: HttpClient) { }

  getArticulo(): Observable<Articulo[]>{
    return this.http.get<Articulo[]>(`${environment.endpoint}/articulo`)
  }

  getArticuloPage(pagina: number): Observable<Articulo[]>{
    let paramHttp = new HttpParams({
      fromObject: {
        page: `${pagina}`
      }
    });
    return this.http.get<Articulo[]>(`${environment.endpoint}/articulo/paginado`, {params: paramHttp})
  }

  public consultarPorId(id: string): Observable<any>{
    return this.http.get<Articulo>(`${URL}/Id/${id}`);
  }

}
