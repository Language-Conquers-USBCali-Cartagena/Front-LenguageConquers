import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.salir();
  }
  salir(){
    this.eliminarCache();
    this.authService.logout();
    this.router.navigateByUrl("/auth/login");
  }
  eliminarCache(){
    localStorage.clear();
  }



}
