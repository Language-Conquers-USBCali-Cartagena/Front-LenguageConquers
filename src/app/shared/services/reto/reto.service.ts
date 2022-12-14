import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Reto } from '../../models/reto';

@Injectable({
  providedIn: 'root'
})
export class RetoService {

  constructor(private http:HttpClient) { }
  getReto():Observable<Reto[]>{
    return this.http.get<Reto[]>(`${environment.endpoint}/reto`)
  }
}
