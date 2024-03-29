import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Avatar } from '../../models/avatar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {

  constructor(private http: HttpClient) { }

  getAvatar(): Observable<Avatar[]>{
    return this.http.get<Avatar[]>(`${environment.endpoint}/avatar`)
  }

  getAvataresPage(pagina: number): Observable<Avatar[]>{
    let paramHttp = new HttpParams({
      fromObject: {
        page: `${pagina}`
      }
    });
    return this.http.get<Avatar[]>(`${environment.endpoint}/avatar/paginado`, {params: paramHttp})
  }

  crearAvatar(avatar: Avatar): Observable<string>{
    return this.http.post(`${environment.endpoint}/avatar/guardarAvatar`, avatar,{ responseType: 'text'});
  }

  consultarPorId(idAvatar: number){
    return this.http.get<Avatar>(`${environment.endpoint}/avatar/porId/${idAvatar}`);
  }

  actualizarAvatar(avatar: Avatar): Observable<string>{
    return this.http.put(`${environment.endpoint}/avatar/actualizarAvatar`,avatar,{ responseType: 'text'});
  }

  eliminarAvatar(idAvatar: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/avatar/eliminarAvatar/${idAvatar}`,{ responseType: 'text'});
  }

  avataresRegistrados(): Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/avatar/cantidadAvatares`);
  }
}
