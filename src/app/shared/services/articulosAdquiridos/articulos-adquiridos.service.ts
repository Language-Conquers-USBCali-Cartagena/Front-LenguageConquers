import { HttpClient } from '@angular/common/http';
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

  listarPorIdAticuloAdquirido(idArticuloAdquirido: number){
    return this.http.get<ArticulosAdquiridos>(`${environment.endpoint}/misArticulos/porId/${idArticuloAdquirido}`);
  }
}
