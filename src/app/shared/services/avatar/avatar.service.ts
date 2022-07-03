import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
