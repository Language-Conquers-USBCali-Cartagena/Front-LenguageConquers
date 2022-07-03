
import {  Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],

})
export class InicioComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  isButtonVisible = false;
  profesorExiste: boolean = false;
  estudianteExiste: boolean = false;

  constructor(private authService: AuthService, private router: Router, private loginService: ServiciosLoginService) { 
    
  }

  ngOnInit(): void {
    this.validaciones();
  }

  async validarExistenciaBD(email: String){
     
    await this.loginService.existEstudianteByCorreo(email).toPromise().then((response) => {
      this.estudianteExiste = response;
    })
    await this.loginService.existProfesorByCorreo(email).toPromise().then((response) => {
      this.profesorExiste = response;
    })
  
    if(this.estudianteExiste == true || this. profesorExiste == true){
      return true
    }else {
      return false
    }

  }

   validaciones(){
    let correo= ''; 
    this.user$.subscribe(  res => {
      if(res.emailVerified == false){
        this.router.navigate(['auth/verificar-email'])
      }
      correo = res.email;
      this.validarExistenciaBD(correo).then(resp => {
        if(resp == false){
          this.router.navigateByUrl("/auth/crearUsuario")
        }
      })
      
    })
    
  }



}
