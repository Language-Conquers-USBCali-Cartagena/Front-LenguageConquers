import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.css'],
  providers: [AuthService],
})
export class RecuperarComponent implements OnInit {
  userEmail = new FormControl('');
  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  async recuperarContra(){
    const email = this.userEmail.value;
    try{
      await this.authService.recuperarContraseña(email);
      window.alert('Correo enviado, revise su inbox')
      this.route.navigateByUrl('/auth/login');
    }catch(error){
      console.log(error);
    }
  }

}
