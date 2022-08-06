import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
import { Estudiante } from '../../../shared/models/estudiante';
import { EstudianteServiceService } from '../services/estudiante-service.service';
import { Observable } from 'rxjs';
import { Curso } from '../../../shared/models/curso';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  estudiante: Estudiante = {};
  cursos?: Observable<Curso[]>;
  correo: string = '';
  constructor(private estudianteService: EstudianteServiceService, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this.correo = this._route.snapshot.params.correo!;
    this.obtenerEstudiante(this.correo);
    this.cursos = this.estudianteService.getCursos(this.correo);
    this.cursos.subscribe(res => {
      console.log(res);
      
    })
  }

  async obtenerEstudiante(correo: string) {
    await this.estudianteService.getEstudiante(correo).toPromise().then((response) => {
      this.estudiante = response;
    }
    )
    console.log(this.estudiante)
    console.log(this.correo)
  }
  
}
