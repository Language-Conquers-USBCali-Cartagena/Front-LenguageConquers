import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
import { Estudiante } from '../../../shared/models/estudiante';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  estudiante: Estudiante = {};
  correo: string = '';
  constructor(private loginService: ServiciosLoginService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.correo = this._route.snapshot?.paramMap?.get('correo')!;
    this.obtenerEstudiante(this.correo);

  }

  async obtenerEstudiante(correo: string) {
    await this.loginService.getEstudiante(correo).toPromise().then((response) => {
      this.estudiante = response;
    }
    )
    console.log(this.estudiante)
    console.log(this.correo)
  }
}
