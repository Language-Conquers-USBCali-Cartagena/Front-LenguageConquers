import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-registro-page',
  templateUrl: './registro-page.component.html',
  styleUrls: ['./registro-page.component.css']
})
export class RegistroPageComponent implements OnInit {
  @Input() loading: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.url === '/auth/login') {
        if (!sessionStorage.getItem('primeraVez')) {
          sessionStorage.setItem('primeraVez', 'true');
          window.location.reload();
        }
      }
    });

  }



}
