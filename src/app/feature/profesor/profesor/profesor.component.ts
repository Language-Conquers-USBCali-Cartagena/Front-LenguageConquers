import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {

  isSideNavCollapsed=false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  salir(){
    this.authService.logout()
    this.router.navigateByUrl("/auth/login");
  }
}
