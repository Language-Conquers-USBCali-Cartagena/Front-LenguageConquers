import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Articulo } from 'src/app/shared/models/articulos';
import { ArticuloService } from 'src/app/shared/services/articulo/articulo.service';
import { Estudiante } from '../../../shared/models/estudiante';
import { ArticulosAdquiridosService } from 'src/app/shared/services/articulosAdquiridos/articulos-adquiridos.service';
import Swal from 'sweetalert2';
import { LogroEstudianteService } from '../../../shared/services/logroEstudiante/logro-estudiante.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tienda-principal',
  templateUrl: './tienda-principal.component.html',
  styleUrls: ['./tienda-principal.component.css'],
})
export class TiendaPrincipalComponent implements OnInit {

  pagina: number = 0;
  productos: Articulo[] = [];
  idArticulos: number = 0;
  monedasEstudiante :number = 0;
  form: UntypedFormGroup;
  idEstudiante: number = 0;
  estudiante: Estudiante = {};
  constructor(
    private articuloService: ArticuloService ,
    private fb: UntypedFormBuilder,
    private articulosObtenidosService: ArticulosAdquiridosService,
    private logroEstudianteService: LogroEstudianteService,
    private router: Router
    ){
    this.form = fb.group({
      id: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.estudiante = JSON.parse(String(localStorage.getItem('usuario')));
    this.idEstudiante = this.estudiante.idEstudiante!;
    this.monedasEstudiante = this.estudiante.monedasObtenidas!;
    this.getArticulo();
  }
  getArticulo(){
    this.articuloService.getArticulosNoObtenidos(this.idEstudiante).subscribe((resp) => {
      this.productos = resp;
    })
  }

  comprarArticulo(idArticulo: any){
    Swal.fire({
      title: '¿Desea realizar esta compra?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#31B2C2',
      preConfirm: () => {
        this.articulosObtenidosService.comprar(this.idEstudiante, idArticulo).subscribe(resp => {
          this.validarLogro(this.estudiante.idEstudiante!);
          this.estudiante.monedasObtenidas = resp;
          localStorage.setItem("usuario", JSON.stringify(this.estudiante));
          Swal.fire({
            icon: 'success',
            title: 'Obtuvo el articulo satisfactoruamente.',
            showConfirmButton: false,
            timer: 2000
          }).then(async (resp) => {
            await this.reload();
          });
        },
        error => {
          Swal.fire({
            icon: 'error',
              title: error['error'],
              showConfirmButton: false,
              showCloseButton: true,
          })
        })
        allowOutsideClick: () => !Swal.isLoading()
      }}).then((resp) => {
        if (resp.isConfirmed) {
          Swal.fire({
            title: '¡Se esta procesando su compra!',
            icon: 'info',
            timerProgressBar: true,
            showConfirmButton: false,
            showCloseButton: false
          })
        }
      })
  }

  async validarLogro(idEstudiante: number){
    await this.logroEstudianteService.comprador(idEstudiante).subscribe((resp) => {
      if(resp != ''){
        Swal.fire({
          title: '¡Felicitaciones!',
          icon: 'success',
          text: resp,
          timer: 3000,
          
        });
      }
    })
  }
  reload(){
    this.router.navigateByUrl('estudiante/articulos-adquiridos')
  }
  // pasarIzq(){
  //   if(this.pagina <=0){
  //     this.pagina = 0;

  //   }else{
  //     this.pagina = this.productos.length -1;
  //     this.getArticulo(this.pagina);

  //   }
  // }
  // pasarDer(){
  //   this.pagina = this.pagina +1;
  //   this.getArticulo(this.pagina);

  // }
}
