import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetoEstudianteService {

  constructor(private http:HttpClient) { }

  promedioRetos():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/retoEstudiante/promedioRetosCompletados`);
  }
}
