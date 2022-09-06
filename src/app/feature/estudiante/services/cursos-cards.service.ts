import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CursosCards } from 'src/app/shared/models/cardCursos';

@Injectable({
  providedIn: 'root'
})
export class CursosCardsService {

  constructor(private http:HttpClient) { }
  getCursosCards(): Observable<CursosCards[]>{
    return this.http.get<CursosCards[]>('./assets/data/cursosCard.json');
  }
}
