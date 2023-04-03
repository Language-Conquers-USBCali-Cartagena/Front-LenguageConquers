import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Administrador } from '../../models/administrador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(
    private http: HttpClient
  ) { }

  getadminPorCorreo(email: string): Observable<Administrador>{
    let httpParams = new HttpParams({
      fromObject: {
        correo: email
      }
    });
    return this.http.get<Administrador>(`${environment.endpoint}/administrador`, {params: httpParams});
  }
}
