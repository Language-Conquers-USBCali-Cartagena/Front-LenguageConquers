import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { Estudiante } from 'src/app/shared/models/estudiante';
import { PalabrasReservadas } from 'src/app/shared/models/palabrasReservadas';
import { Reto } from 'src/app/shared/models/reto';
import { RetoEstudiante } from 'src/app/shared/models/retoEstudiante';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { EstudianteService } from 'src/app/shared/services/estudiante/estudiante.service';
import { LogroEstudianteService } from 'src/app/shared/services/logroEstudiante/logro-estudiante.service';
import { PalabraReservadaService } from 'src/app/shared/services/palabraReservada/palabraReservada.service';
import { RetoService } from 'src/app/shared/services/reto/reto.service';
import { RetoEstudianteService } from 'src/app/shared/services/retoEstudiante/reto-estudiante.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.css']
})
export class DragAndDropComponent implements OnInit {
  retoParam: number = 0;
  exampleContainerHeight: string | undefined;
  palabras: PalabrasReservadas[] = [];
  estudiante: Estudiante = {};
  retoEstudiante: RetoEstudiante = {}
  retoInfo: Reto = {};
  isBasic = false;
  a: PalabrasReservadas[] = [];
  b: PalabrasReservadas[] = [];
  c: PalabrasReservadas[] = [];
  d: PalabrasReservadas[] = [];
  e: PalabrasReservadas[] = [];
  f: PalabrasReservadas[] = [];
  g: PalabrasReservadas[] = [];
  h: PalabrasReservadas[] = [];
  i: PalabrasReservadas[] = [];
  j: PalabrasReservadas[] = [];
  condicion = false;
  constructor(
    private router: Router,
    private palabraService: PalabraReservadaService,
    private route: ActivatedRoute,
    private retosService: RetoService,
    private retoEstudianteService: RetoEstudianteService,
    private estudianteService: EstudianteService,
    private logroEstudianteService: LogroEstudianteService,
  ) { }

  async ngOnInit() {
    this.retoParam = this.route.snapshot.params['reto'];
    await this.obtenerReto();
    await this.esBasico();
    this.estudiante = JSON.parse(String(localStorage.getItem('usuario')))
    await this.ObtenetPalabras();
    this.obtenerRetoEstudiante()

  }

  ObtenetPalabras() {
    this.palabraService.getPalabrasReservadas(this.retoParam).subscribe(data => {
      this.palabras = data;
    });
  }
  obtenerReto() {
    this.retosService.consultarPorId(this.retoParam).subscribe(data => {
      this.retoInfo = data;
      this.mostrarInstrucciones();
    })
  }
  obtenerRetoEstudiante() {
    this.retoEstudianteService.porRetoyEstudiante(this.retoParam!, this.estudiante.idEstudiante!).subscribe(resp => {
      this.retoEstudiante = resp;
    });
  }

  drop(event: CdkDragDrop<PalabrasReservadas[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    if (this.palabras.length > 1) {
      this.exampleContainerHeight = `${this.palabras.length * 600}px`;
    } else if (this.palabras.length <= 1) {
      this.exampleContainerHeight = `${this.palabras.length}px`;
    }
  }
  reto(): void {
    this.router.navigate(['../curso/ide/1/1'])
  }
  esBasico() {
    if (this.retoParam <= 3) {
      this.isBasic = true;
    }
  }
  //-------------------------

  ejecutar() {
    this.organizar(this.a, 1);
    this.organizar(this.b, 2);
    this.organizar(this.c, 3)
    this.organizar(this.d, 4);
    this.organizar(this.e, 5);
    this.organizar(this.f, 6);
    this.organizar(this.g, 7);
    this.organizar(this.h, 8);
    this.organizar(this.i, 9);
    this.organizar(this.j, 10);
    let resp: PalabrasReservadas[] = this.a.concat(this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.j);
    let id = this.estudiante.idEstudiante!;
    Swal.fire({
      title: '¿Desea enviar la solución?',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      confirmButtonColor: '#31B2C2',
      preConfirm: () => {
        this.retosService.completar(resp, this.isBasic, id, this.retoParam).subscribe(async respuesta => {
          this.retoEstudiante.fechaModificacion = new Date;
          this.retoEstudiante.usuarioModificador = 'admin';
          this.retoEstudiante.idEstado = 3;
          if (respuesta)
            await this.retoEstudianteService.actualizarRetoEstudiante(this.retoEstudiante).subscribe(async rep => {
              let total = this.sumarID();
              if (total <= 6) {
                this.retoEstudiante = {
                  fechaCreacion: new Date, fechaEntrega: new Date, idEstado: 1, idEstudiante: this.estudiante.idEstudiante!, idGrupo: 1,
                  idReto: total, idRol: 1, puntaje: 0, usuarioCreador: 'admin', intentos: 0
                };
                await this.retoEstudianteService.crearRetoEstudiante(this.retoEstudiante).subscribe(async resp => {

                  await Swal.fire({
                    title: 'Respuesta!',
                    html: `<div style="white-space: pre-line;">${respuesta}</div>`,
                    icon: 'success',
                    focusConfirm: false,
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#31B2C2',
                  }).then(async () => {
                    await this.actualizarEstudiante(id, this.retoParam);
                  });
                }, error => {
                  Swal.fire({
                    html: `<div style="white-space: pre-line;">${error.error.replace(/(\!|\.)/g, '$1\n')}</div>`,
                    icon: 'error',
                    focusConfirm: false,
                    confirmButtonText: 'Intentar',
                    confirmButtonColor: '#31B2C2',
                  });
                });
              } else {
                await Swal.fire({
                  title: 'Respuesta!',
                  html: `<div style="white-space: pre-line;">${respuesta}</div>`,
                  icon: 'success',
                  focusConfirm: false,
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: 'Continuar',
                  confirmButtonColor: '#31B2C2',
                }).then(async () => {
                  await this.actualizarEstudiante(id, this.retoParam);
                });
              }
            });
        }, error => {
          if (error instanceof HttpErrorResponse) {
            if (error.error == "Has superado el máximo de intentos.") {
              //TODO: Si entra debe habilitar siguiente nivel y sacar
              let total = this.sumarID();
              if (total <= 6) {
                this.retoEstudiante = {
                  fechaCreacion: new Date, fechaEntrega: new Date, idEstado: 1, idEstudiante: this.estudiante.idEstudiante!, idGrupo: 1,
                  idReto: total, idRol: 1, puntaje: 0, usuarioCreador: 'admin', intentos: 0
                };
                this.retoEstudianteService.crearRetoEstudiante(this.retoEstudiante).subscribe(async (resp) => {
                  await Swal.fire({
                    title: 'Respuesta!',
                    text: error.error,
                    icon: 'error',
                    focusConfirm: false,
                    showCancelButton: false,
                    showConfirmButton: true,
                    confirmButtonText: 'Continuar',
                    confirmButtonColor: '#31B2C2',
                  }).then(async () => {
                    await this.actualizarEstudiante(id, this.retoParam);
                  });
                });
                console.log(error.error);
              }
            }else{
              Swal.fire({
                html: `<div style="white-space: pre-line;">${error.error.replace(/(\!|\.)/g, '$1\n')}</div>`,
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'Intentar',
                confirmButtonColor: '#31B2C2',
              });
            }
          } else {
            Swal.fire({
              text: `<div style="white-space: pre-line;">${error.error.replace(/(\!|\.)/g, '$1\n')}</div>`,
              icon: 'error',
              focusConfirm: false,
              confirmButtonText: 'Intentar',
              confirmButtonColor: '#31B2C2',
            });
          }
        })
        allowOutsideClick: () => !Swal.isLoading()
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Se esta validando la respuesta!',
          icon: 'info',
          timerProgressBar: true,
          showConfirmButton: false,
          showCloseButton: false
        })
      }
    })



  }
  async validarLogros(idestudiante: number, idReto: number) {
    await this.logroEstudianteService.perfeccionista(idestudiante, idReto).subscribe((resp) => {
      if (resp != '') {
        Swal.fire({
          title: '¡Felicitaciones!',
          icon: 'success',
          text: resp,
          timer: 3000
        }).then(() => {
          window.history.back();
        });
      }
    });

  }
  async actualizarEstudiante(idEstudiante: number, idReto: number) {
    await this.estudianteService.consultarPorId(idEstudiante).subscribe(async (resp) => {
      let estudiante: Estudiante = resp;
      localStorage.setItem("usuario", JSON.stringify(estudiante));
      await this.logroEstudianteService.ahorrador(estudiante.idEstudiante!).subscribe(async (resp) => {
        await this.validarLogros(idEstudiante, idReto);
        if (resp != '') {
          Swal.fire({
            title: '¡Felicitaciones!',
            icon: 'success',
            text: resp,
            timer: 3000
          }).then(() => {
            console.log("Entro al then");
          });
        }
        window.history.back();
      });
    });
  }

  sumarID() {
    let idReto: number = Number(this.retoParam);
    let suma: number = 1;
    let total: number = suma + idReto;
    return total;
  }
  organizar(lista: PalabrasReservadas[], numeroLista: number) {
    for (let i = 0; i < lista.length; i++) {

      lista[i].orden = i + 1;
      lista[i].lista = numeroLista;
    }
  }


  isSideNavCollapsed=false;

  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  atras() {
    this.router.navigateByUrl('estudiante/curso/mapa/1');
  }

  mostrarTutorial() {
    Swal.fire({
      html:
        '<iframe width="440" height="315" src="{{v}}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

  mostrarPistas() {
    Swal.fire({
      title: this.retoInfo.nombreReto,
      text: this.retoInfo.descripcionTeoria,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#31B2C2',
      showCancelButton: false,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.retoInfo.urlVideo1 !== null) {
          console.log(this.retoInfo.urlVideo1);

          Swal.fire({
            title: '¿Abrir YouTube?',
            text: 'Se abrirá una nueva ventana con la página de YouTube',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: '#31B2C2',
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(this.retoInfo.urlVideo1, '_blank');
            }
          });
        } else if (this.retoInfo.urlVideo2 !== null) {
          Swal.fire({
            title: '¿Abrir YouTube?',
            text: 'Se abrirá una nueva ventana con la página de YouTube',
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
            confirmButtonColor: '#31B2C2',
          }).then((result) => {
            if (result.isConfirmed) {
              window.open(this.retoInfo.urlVideo2, '_blank');
            }
          });
        } else if (this.retoInfo.imagenTema1 !== null) {
          Swal.fire({
            title: this.retoInfo.nombreReto,
            imageUrl: this.retoInfo.imagenTema1,
            imageWidth: 400,
            imageHeight: 200,
            confirmButtonText: 'Continuar Explicación',
            confirmButtonColor: '#31B2C2',
            showCancelButton: false,
            showCloseButton: true,
          })
        } else if (this.retoInfo.imagenTema2 !== null) {
          Swal.fire({
            title: this.retoInfo.nombreReto,
            imageUrl: this.retoInfo.imagenTema2,
            imageWidth: 400,
            imageHeight: 200,
            confirmButtonText: 'Continuar Explicación',
            confirmButtonColor: '#31B2C2',
            showCancelButton: false,
            showCloseButton: true,
          })
        }
      }
    })
  }


  mostrarInstrucciones() {
    if(this.isBasic == true){
      Swal.fire({
        imageUrl: '../../../../../assets/images/instrucciones/1.png',
        imageWidth: 500,
        imageHeight: 400,
        imageAlt: 'Instrucciones',
        showCloseButton: true,
        showConfirmButton: false
      }).then((result) =>{
        Swal.fire({
          imageUrl: '../../../../../assets/images/instrucciones/3.png',
          imageWidth: 500,
          imageHeight: 400,
          imageAlt: 'Instrucciones',
          showCloseButton: true,
          showConfirmButton: false
        })
      });
    }else{
      Swal.fire({
        imageUrl: '../../../../../assets/images/instrucciones/2.png',
        imageWidth: 500,
        imageHeight: 400,
        imageAlt: 'Instrucciones',
        showCloseButton: true,
        showConfirmButton: false
      }).then((result) =>{
        Swal.fire({
          imageUrl: '../../../../../assets/images/instrucciones/3.png',
          imageWidth: 500,
          imageHeight: 400,
          imageAlt: 'Instrucciones',
          showCloseButton: true,
          showConfirmButton: false
        })
      });;
    }




  }


 paginasNoDisponibles(){
  Swal.fire({
    imageUrl: '../../../../../assets/images/PaginaConstruccion.png',
    imageWidth: 'auto',
    imageHeight: 350,
    showConfirmButton: false,
    showCloseButton: true,
    background: '#e5e5e5',
  })
}

}
