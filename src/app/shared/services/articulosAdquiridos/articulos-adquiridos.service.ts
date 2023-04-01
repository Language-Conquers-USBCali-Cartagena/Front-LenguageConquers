import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticulosAdquiridos } from '../../models/articulosAdquiridos';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticulosAdquiridosService {

  constructor(private http: HttpClient) { }

  getArticulosAdquiridos():Observable<ArticulosAdquiridos[]>{
    return this.http.get<ArticulosAdquiridos[]>(`${environment.endpoint}/misArticulos`)
  }
  crearArticulosAdquiridos(articulosAdquiridos: ArticulosAdquiridos): Observable<string>{
    return this.http.post(`${environment.endpoint}/misArticulos/guardarArticuloAdquirido`, articulosAdquiridos,{ responseType: 'text'});
  }
  actualizarArticuloAdquirido(articuloAdquirido: ArticulosAdquiridos): Observable<string>{
    return this.http.put(`${environment.endpoint}/misArticulos/actualizarArticuloAdquirido`, articuloAdquirido,{ responseType: 'text'});
  }

  eliminarArticuloAdquirido(idArticuloAdquirido: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/misArticulos/eliminarArticuloAdquirido/${idArticuloAdquirido}`, { responseType: 'text'});
  }
  eliminarArticulosPorIds(idEstudiante: number, idArticulo: number): Observable<String>{
    let paramsHttp = new HttpParams({
      fromObject: {
        idEstudiante: `${idEstudiante}`,
        idArticulo: `${idArticulo}`
      }
    });
    return this.http.delete(`${environment.endpoint}/misArticulos/eliminarArticuloPorIds`, {params: paramsHttp, responseType: 'text'});
  }

  listarPorIdAticuloAdquirido(idArticuloAdquirido: number){
    return this.http.get<ArticulosAdquiridos>(`${environment.endpoint}/misArticulos/porId/${idArticuloAdquirido}`);
  }
  comprar(idEstudiante: number, idArticulo: number): Observable<number>{
    let paramsHttp = new HttpParams({
      fromObject: {
        idEstudiante: `${idEstudiante}`,
        idArticulo: `${idArticulo}`
      }
    });
    return this.http.get<number>(`${environment.endpoint}/misArticulos/comprar`, {params: paramsHttp});
  }
}
