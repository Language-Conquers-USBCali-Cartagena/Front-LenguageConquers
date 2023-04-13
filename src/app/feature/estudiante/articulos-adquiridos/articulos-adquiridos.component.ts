import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { Articulo } from 'src/app/shared/models/articulos';
import { ArticulosAdquiridos } from 'src/app/shared/models/articulosAdquiridos';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { Semestre } from 'src/app/shared/models/semestre';
import { ArticuloService } from 'src/app/shared/services/articulo/articulo.service';
import { ArticulosAdquiridosService } from 'src/app/shared/services/articulosAdquiridos/articulos-adquiridos.service';
import { SemestreService } from 'src/app/shared/services/semestre/semestre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-adquiridos',
  templateUrl: './articulos-adquiridos.component.html',
  styleUrls: ['./articulos-adquiridos.component.css']
})
export class ArticulosAdquiridosComponent implements OnInit {

  articulosA:Articulo[] = [];
  estudiante: Estudiante = {};
  articuloSeleccionado: Articulo = {};
  mostrarImagen = false;



  constructor(
    private articulosAdquiridosService: ArticulosAdquiridosService,
    private router: Router,
    private articulosService: ArticuloService
    ) { }

  async ngOnInit() {
    this.estudiante = JSON.parse(String(localStorage.getItem('usuario')))!;
    await this.obtenerArticulos();
  }

  async obtenerArticulos(){

    let idEstudiante: number = this.estudiante.idEstudiante!;
    await this.articulosService.getArticulosObtenidos(idEstudiante).subscribe(resp => {
      
      if(resp[0] == undefined){
        let articulo: Articulo[] = [{descripcion: 'Visita nuestra tienda y descubre los productos disponibles.', nombre: 'No has adquirido ningún artículo.', imagen: 'ssfsd'}]; 
        this.articulosA = articulo;
        this.articuloSeleccionado = articulo[0];
      }else{
        this.articulosA = resp;
        this.articuloSeleccionado = resp[0];
      }
    });
  }

  irMapa(){
    window.history.go(-1);
  }

  mostrarImagenGrande(articulo : Articulo | undefined){
    this.articuloSeleccionado= articulo!;
    this.mostrarImagen = true;
  }

  eliminarArticulo(){
    Swal.fire({
      title: 'Deseas eliminar este artículo ' + this.articuloSeleccionado.nombre,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#31B2C2',
    }).then((result) => {
      if (result.isConfirmed) {

        this.articulosAdquiridosService.eliminarArticulosPorIds(this.estudiante.idEstudiante!, this.articuloSeleccionado.idArticulo!).subscribe(data =>{

          Swal.fire({
            icon: 'success',
            title: data,
            showConfirmButton: false,
            timer: 2000
          }).then((result) => {
            window.location.reload();
          });

        })
      }
    })
  }

}
