import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Profesor } from '../../../shared/models/profesor';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/shared/models/curso';

@Injectable({
  providedIn: 'root'
})
export class ProfesorServicesService {

  baseUrl: string = environment.endpoint;
  constructor(private http: HttpClient) { }

  getProfesor(email: string): Observable<Profesor>{
    let paramsHttp = new HttpParams({
      fromObject: {
        correo: `${email}`
      }
    });
    return this.http.get<Profesor>(`${this.baseUrl}/profesor/porCorreo`, {params: paramsHttp});
  }


}
