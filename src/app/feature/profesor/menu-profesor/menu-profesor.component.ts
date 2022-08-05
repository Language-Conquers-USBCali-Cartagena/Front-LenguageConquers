import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../shared/models/profesor';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.css']
})
export class MenuProfesorComponent implements OnInit {
  profesor: Profesor = {};
  correo: string ='';
  constructor(private loginService: ServiciosLoginService, private _route: ActivatedRoute) { 

    
  }
  ngOnInit(): void {
    this.correo = this._route.snapshot.params.id!;
    
    this.obtenerProfesor(this.correo);
   
  }

  async obtenerProfesor(correo: string) {
    await this.loginService.getProfesor(correo).toPromise().then((response) => {
      this.profesor = response;
    }
    )
    console.log(this.profesor)
    console.log(this.correo)
  }

}
