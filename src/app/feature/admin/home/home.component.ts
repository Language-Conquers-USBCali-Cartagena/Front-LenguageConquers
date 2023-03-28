import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { ArticuloService } from 'src/app/shared/services/articulo/articulo.service';
import { AvatarService } from 'src/app/shared/services/avatar/avatar.service';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { LogrosService } from 'src/app/shared/services/logros/logros.service';
import { ProfesorService } from 'src/app/shared/services/profesor/profesor.service';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {


  view: [number, number] = [700, 600];

   // options
   showLegend: boolean = true;
   showLabels: boolean = true;
   gradient: boolean = false;
   animations: boolean = true;

   cardColor: string = '#232837';

  public data: any[] = [];

  constructor(private estudianteService: EstudianteService, private profesorService: ProfesorService, private retoService: RetoService,
    private articulosService: ArticuloService, private avatarService: AvatarService, private logrosService: LogrosService,
    private retoEstudianteService: RetoEstudianteService) {
    this.data = [];
  }


   ngOnInit() {
    this.single.subscribe(data =>{
      this.data = data;
    });
  }

  labelFormatting(c: any) {
    return `${(c.label)}`;
  }

  get single(){
  return combineLatest([
    this.profesorService.cantidadProfesores(),
    this.estudianteService.cantidadEstudiantes(),
    this.retoService.promedioRetos(),
    this.retoService.cantidadRetos(),
    this.articulosService.articulosRegistrados(),
    this.avatarService.avataresRegistrados(),
    this.logrosService.cantidadLogros(),
    this.retoEstudianteService.promedioRetos(),
    this.estudianteService.monedasGanadasPromedio()
  ]).pipe(
    map(([cantidadP, cantidadE, promRetos, cantidadRetos, cantidadArticulos, cantidadAvatares, cantidadLogros, promedioRetosEstudiante, promedioMonedasGanadas]) => {
      return [
        {name: 'Profesores Registrados', value: cantidadP},
        {name: 'Estudiantes Registrados', value: cantidadE},
        {name: 'Logros Registrados', value: cantidadLogros},
        {name: 'Articulos disponibles en la tienda', value: cantidadArticulos},
        {name: 'Avatares disponibles', value: cantidadAvatares},
        {name: 'Retos disponibles', value: cantidadRetos},
        {name: 'Promedio de retos completados de los estudiantes', value: promedioRetosEstudiante},
        {name: 'promedio de monedas ganadas de los estudiantes', value: promedioMonedasGanadas},
        {name: 'promedio de monedas asignadas por reto', value: promRetos}
      ]
    } )
  );
 }

 onSelect1(event: Event) {
   console.log(event);
 }



}
