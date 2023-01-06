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

  crearAvatar(avatar: Avatar){
    return this.http.post<Avatar>(`${environment.endpoint}/avatar/guardarAvatar`, avatar);
  }

  consultarPorId(idAvatar: number){
    return this.http.get<Avatar>(`${environment.endpoint}/avatar/porId/${idAvatar}`);
  }

  actualizarAvatar(avatar: Avatar): Observable<Avatar>{
    return this.http.put<Avatar>(`${environment.endpoint}/avatar/actualizarAvatar/${avatar.idAvatar}`,avatar);
  }

  eliminarAvatar(avatar: Avatar): Observable<Avatar>{
    return this.http.delete<Avatar>(`${environment.endpoint}/avatar/eliminarAvatar/${avatar.idAvatar}`);
  }
}
