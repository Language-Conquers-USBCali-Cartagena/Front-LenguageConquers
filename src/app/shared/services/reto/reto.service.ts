import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

  crearReto(reto: Reto): Observable<string>{
    return this.http.post(`${environment.endpoint}/reto/guardarReto`, reto,{ responseType: 'text'});
  }

  consultarPorId(idReto: number){
    return this.http.get<Reto>(`${environment.endpoint}/reto/porId/${idReto}`);
  }

  actualizarReto(reto: Reto): Observable<String>{
    return this.http.put(`${environment.endpoint}/reto/actualizarReto`,reto,{ responseType: 'text'});
  }

  eliminarReto(idReto: number): Observable<string>{
    return this.http.delete(`${environment.endpoint}/reto/eliminarReto/${idReto}`,{ responseType: 'text'});
  }

  private retoSubject = new BehaviorSubject<any>(null);
  reto$ = this.retoSubject.asObservable();

  setReto(reto: any) {
    this.retoSubject.next(reto);
  }

  cantidadRetos():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/reto/cantidadRetos`);
  }

  promedioRetos():Observable<number>{
    return this.http.get<number>(`${environment.endpoint}/reto/promedioMonedasRetos`);
  }
}
