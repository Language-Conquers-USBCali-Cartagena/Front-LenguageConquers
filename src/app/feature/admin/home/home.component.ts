import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cantidadE: number = 0;
  cantidadP = 0;
  total = 0;
  constructor(private estudianteService: EstudianteService, private profesorService: ProfesorService) { }

  ngOnInit() {
    this.getTotalEstudiantes();
    this.getTotalProfesores();
  }

 getTotalEstudiantes(){
  this.estudianteService.cantidadEstudiantes().subscribe(data => {
    this.cantidadE = data;
  });
 }

 getTotalProfesores(){
  this.profesorService.cantidadProfesores().subscribe(data =>{
    this.cantidadP = data;
  })
 }

}
