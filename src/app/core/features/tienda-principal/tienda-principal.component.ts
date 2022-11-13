import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Articulo } from 'src/app/shared/models/articulos';
import { ArticuloService } from 'src/app/shared/services/articulo/articulo.service';

@Component({
  selector: 'app-tienda-principal',
  templateUrl: './tienda-principal.component.html',
  styleUrls: ['./tienda-principal.component.css']
})
export class TiendaPrincipalComponent implements OnInit {

  pagina: number = 0;
  productos: Articulo[] = [];
  idArticulos: number = 0;
  form: UntypedFormGroup;
  constructor(private articuloService: ArticuloService ,private fb: UntypedFormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }
  async getArticulo(page: number){
    await this.articuloService.getArticuloPage(page).toPromise().then((response) => {
      if(response.length <= 0){
        this.pagina = this.pagina-1;
      }else{
        this.productos = response;
      }
    })
  }

  pasarIzq(){
    if(this.pagina <=0){
      this.pagina = 0;

    }else{
      this.pagina = this.productos.length -1;
      this.getArticulo(this.pagina);

    }
  }
  pasarDer(){
    this.pagina = this.pagina +1;
    this.getArticulo(this.pagina);

  }
  obtenerId(id: String){
    console.log(id);


  }


}
