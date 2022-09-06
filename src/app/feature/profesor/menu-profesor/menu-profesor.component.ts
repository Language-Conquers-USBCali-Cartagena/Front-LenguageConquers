import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../shared/models/profesor';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
import { ActivatedRoute } from '@angular/router';
import { CursosCards } from 'src/app/shared/models/cardCursos';
import { CursosCardsService } from '../../estudiante/services/cursos-cards.service';

@Component({
  selector: 'app-menu-profesor',
  templateUrl: './menu-profesor.component.html',
  styleUrls: ['./menu-profesor.component.css']
})
export class MenuProfesorComponent implements OnInit {
  cursosCard: CursosCards[] = [];
  profesor: Profesor = {};
  correo: string ='';
  constructor(private loginService: ServiciosLoginService, private cardsCursos:CursosCardsService, private _route: ActivatedRoute) {


  }
  ngOnInit(): void {
    this.cargarTarjetasCursos();
    this.correo = this._route.snapshot.params.id!;
    this.obtenerProfesor(this.correo);

  }
  cargarTarjetasCursos(){
    this.cargarTarjetasCursos();
    this.cardsCursos.getCursosCards().subscribe(data =>{
      this.cursosCard = data
    });
  }

  async obtenerProfesor(correo: string) {
    await this.loginService.getProfesor(correo).toPromise().then((response) => {
      this.profesor = response;
    }
    )
    // console.log(this.profesor)
    // console.log(this.correo)
  }
  

}
