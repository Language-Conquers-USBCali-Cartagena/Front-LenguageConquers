import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estudiante',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  salir(){
    this.authService.logout()
    this.router.navigateByUrl("/auth/login");
  }
}
