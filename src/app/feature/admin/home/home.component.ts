import { Component, OnInit } from '@angular/core';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';

interface ColorScheme {
  domain: string[];
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  cantidadE: number = 0;
  cantidadP = 0;
  total = 0;


  view: [number, number] = [400, 300];

   // options
   showLegend: boolean = true;
   showLabels: boolean = true;


   // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme: ColorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
   };

  single = [
    {
      "name": "Germany",
      "value": 8940000
    },

  ];

  constructor(private estudianteService: EstudianteService, private profesorService: ProfesorService) {
    //Object.assign(this, { single });
  }


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
 onSelect(event: Event) {
   console.log(event);
 }

 onSelect1(data: any): void {
  console.log('Item clicked', JSON.parse(JSON.stringify(data)));
}

onActivate(data: any): void {
  console.log('Activate', JSON.parse(JSON.stringify(data)));
}

onDeactivate(data: any): void {
  console.log('Deactivate', JSON.parse(JSON.stringify(data)));
}

}
