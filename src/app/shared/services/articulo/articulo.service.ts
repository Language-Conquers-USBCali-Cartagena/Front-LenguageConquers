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


  crearArticulo(articulo: Articulo): Observable<string>{
    return this.http.post(`${environment.endpoint}/articulo/guardarArticulo`, articulo,{ responseType: 'text'});
  }

  consultarPorId(idArticulo: number){
    return this.http.get<Articulo>(`${environment.endpoint}/articulo/porId/${idArticulo}`);
  }

  actualizarArticulo(articulo: Articulo): Observable<string>{
    return this.http.put(`${environment.endpoint}/articulo/actualizarArticulo`, articulo,{ responseType: 'text'});
  }

  eliminarArticulo(idArticulo: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/articulo/eliminarArticulo/${idArticulo}`,{ responseType: 'text'});
  }

  articulosRegistrados(): Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/articulo/cantidadArticulos`);
  }

  getArticulosNoObtenidos(idEstudiante: number): Observable<Articulo[]>{
    let paramsHttp = new HttpParams({
      fromObject: {
        idEstudiante: `${idEstudiante}`
      }
    });
    return this.http.get<Articulo[]>(`${environment.endpoint}/articulo/articulosNoObtenidos`, {params: paramsHttp})
  }
}
