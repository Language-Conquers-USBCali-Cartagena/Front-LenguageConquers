import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticulosAdquiridos } from 'src/app/shared/models/articulosAdquiridos';
import { Semestre } from 'src/app/shared/models/semestre';
import { ArticulosAdquiridosService } from 'src/app/shared/services/articulosAdquiridos/articulos-adquiridos.service';
import { SemestreService } from 'src/app/shared/services/semestre/semestre.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulos-adquiridos',
  templateUrl: './articulos-adquiridos.component.html',
  styleUrls: ['./articulos-adquiridos.component.css']
})
export class ArticulosAdquiridosComponent implements OnInit {

  articulosA:ArticulosAdquiridos[] = [];

  imagenUrl = '';
  mostrarImagen = false;
  

  
  constructor(private articulosAdquiridosService: ArticulosAdquiridosService,  private router: Router) { }

  ngOnInit(): void {

  }


  irMapa(){
    this.router.navigate(['/curso/mapa/1']);
  }

  mostrarImagenGrande(){
    this.imagenUrl = '../../assets/images/tienda/gorra.png';
    this.mostrarImagen = true;
  }

  eliminarArticulo(idArticulo: number){
    Swal.fire({
      title: 'Deseas eliminar este artículo {NombreArticulo}',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        //aqui va el metodo para eliminar el articulo - se traer el elemento con el localstorage
        this.articulosAdquiridosService.eliminarArticuloAdquirido(idArticulo).subscribe(data =>{
          this.articulosA = this.articulosA.filter(c => c!== idArticulo);
          Swal.fire('Artículo Eliminado!', '', 'success')
        })
      }
    })
  }

}
