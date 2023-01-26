import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../../models/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http:HttpClient) { }
  getUsuario():Observable<Usuarios[]>{
    return this.http.get<Usuarios[]>(`${environment.endpoint}/usuarios`)
  }
}
