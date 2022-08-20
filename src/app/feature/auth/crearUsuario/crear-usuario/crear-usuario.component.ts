import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {
 
  public user$:Observable<any> = this.authService.afauth.user;
  constructor(private router:Router, private authService: AuthService) {

   }

  ngOnInit(): void {
  }
  salir(){
    this.router.navigateByUrl("/logout");
  }
}
