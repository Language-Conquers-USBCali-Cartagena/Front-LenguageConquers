
import {  Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],

})
export class InicioComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  isButtonVisible = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user$.subscribe(res => {
      if(res.emailVerified == false){
        this.router.navigate(['auth/verificar-email'])
      }
    })
  }



}
