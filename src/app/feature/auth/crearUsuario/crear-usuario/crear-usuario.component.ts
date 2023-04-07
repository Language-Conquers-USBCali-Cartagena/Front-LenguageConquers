import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/service/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { HostListener } from "@angular/core";
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  public user$:Observable<any> = this.authService.afauth.user;
  screenHeight: number =695;
  screenWidth: number =900;
  col:number =2;
  constructor(private router:Router, private authService: AuthService) {
    this.onResize();
  }

  ngOnInit(): void {
  }
  salir(){
    this.router.navigateByUrl("/auth/login");
  }
  @HostListener('window:resize', ['$event'])
  onResize(_event?: undefined) {
     this.screenHeight = window.innerHeight;
     this.screenWidth = window.innerWidth;
     if(this.screenWidth<700){
      this.col=1;
     }else{
      this.col=2;
     }
     
     
  }
}
