import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private router:Router, private authService: AuthService) { }

  ngOnInit(): void {
  }
  goToPerfil(){
    this.router.navigate(['/perfilEstudiante']);
  }

  salir(){
    this.authService.logout()
    this.router.navigateByUrl("/auth/login");
  }

  ObtenerUsuarioLogueado(){
    this.authService.getUserLogged().subscribe(res => {

      console.log("Usuario: ", res?.email);

    });
  }
}
