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


  crearArticulo(articulo: Articulo){
    return this.http.post<Articulo>(`${environment.endpoint}/articulo/guardarArticulo`, articulo);
  }

  consultarPorId(idArticulo: number){
    return this.http.get<Articulo>(`${environment.endpoint}/articulo/porId/${idArticulo}`);
  }

  actualizarArticulo(articulo: Articulo): Observable<Articulo>{
    return this.http.put<Articulo>(`${environment.endpoint}/articulo/actualizarArticulo/${articulo.idArticulo}`, articulo);
  }

  eliminarArticulo(articulo: Articulo): Observable<Articulo>{
    return this.http.delete<Articulo>(`${environment.endpoint}/articulo/eliminarArticulo/${articulo.idArticulo}`);
  }
}
