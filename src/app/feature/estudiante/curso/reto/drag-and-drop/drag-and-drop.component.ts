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
  exampleContainerHeight:string | undefined;
  palabras: PalabrasReservadas[] = [];
  estudiante: Estudiante = {};
  retoEstudiante: RetoEstudiante = {}
  retoInfo: Reto = {};
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
    this.mostrarPistas();
    this.retoParam = this.route.snapshot.params['reto'];
    this.estudiante = JSON.parse(String(localStorage.getItem('usuario')))
    await this.ObtenetPalabras();
    this.obtenerRetoEstudiante()
    await this.obtenerReto();
  }

  ObtenetPalabras(){
    this.palabraService.getPalabrasReservadas(this.retoParam).subscribe(data => {
      this.palabras = data;
    });
  }
  obtenerReto(){
    this.retosService.consultarPorId(this.retoParam).subscribe(data =>{
      this.retoInfo = data;
      this.mostrarPistas();
    })
  }
  obtenerRetoEstudiante(){
    this.retoEstudianteService.porRetoyEstudiante(this.retoParam!, this.estudiante.idEstudiante!).subscribe(resp =>{
      this.retoEstudiante = resp;
    });
  }

  //-----------------------------------------
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
    if(this.palabras.length >1){
      this.exampleContainerHeight = `${this.palabras.length * 600}px`;
    }else if(this.palabras.length <=1){
      this.exampleContainerHeight = `${this.palabras.length}px`;
    }
  }
  reto(): void {
    this.router.navigate(['../curso/ide/1/1'])
  }

  //-------------------------
  ejecutar(){
    let esBasico = false;
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
    if(this.retoParam <=3){
      esBasico = true;
    }
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
        this.retosService.completar(resp, esBasico, id, this.retoParam).subscribe(async respuesta =>{
          this.retoEstudiante.fechaModificacion = new Date;
          this.retoEstudiante.usuarioModificador = 'admin';
          this.retoEstudiante.idEstado = 3;
          await this.retoEstudianteService.actualizarRetoEstudiante(this.retoEstudiante).subscribe(async rep => {
            let total = this.sumarID();
            if(total <= 6){
              this.retoEstudiante = {fechaCreacion: new Date, fechaEntrega: new Date, idEstado: 1, idEstudiante: this.estudiante.idEstudiante!, idGrupo: 1,
                idReto: total, idRol: 1, puntaje: 0, usuarioCreador: 'admin', intentos: 0};
              await this.retoEstudianteService.crearRetoEstudiante(this.retoEstudiante).subscribe(async resp => {

                await Swal.fire({
                  title: 'Respuesta!',
                  html:  `<div style="white-space: pre-line;">${respuesta}</div>`,
                  icon: 'success',
                  focusConfirm: false,
                  showCancelButton: false,
                  showConfirmButton: true,
                  confirmButtonText: 'Continuar',
                  confirmButtonColor: '#31B2C2',
                }).then(async() => {
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
            }
          });
          }, error => {
            if(error instanceof HttpErrorResponse){
              Swal.fire({
                html: `<div style="white-space: pre-line;">${error.error.replace(/(\!|\.)/g, '$1\n')}</div>`,
                icon: 'error',
                focusConfirm: false,
                confirmButtonText: 'Intentar',
                confirmButtonColor: '#31B2C2',
              });
            }else {
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
  async validarLogros(idestudiante: number, idReto: number){
    await this.logroEstudianteService.perfeccionista(idestudiante, idReto).subscribe((resp) => {
      if(resp != ''){
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
  async actualizarEstudiante(idEstudiante: number, idReto: number){
    await this.estudianteService.consultarPorId(idEstudiante).subscribe(async (resp) => {
      let estudiante: Estudiante = resp;
      localStorage.setItem("usuario", JSON.stringify(estudiante));
      await this.logroEstudianteService.ahorrador(estudiante.idEstudiante!).subscribe(async (resp) => {
        await this.validarLogros(idEstudiante, idReto);
        if(resp != ''){
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
    });
  }

  sumarID(){
    let idReto: number =  Number(this.retoParam) ;
    let suma: number = 1;
    let total: number = suma + idReto;
    return total;
  }
  organizar(lista: PalabrasReservadas[], numeroLista: number){
    for(let i = 0; i < lista.length; i ++){

      lista[i].orden = i +1;
      lista[i].lista = numeroLista;
    }
  }



  isSideNavCollapsed=false;
  screenWidth = 0;
  onToggleSideNav(data: SideNavToggle):void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  atras(){
    this.router.navigateByUrl('estudiante/curso/mapa/1');
  }
  mostrarTutorial(){
    Swal.fire({
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })
  }

  mostrarPistas(){
    Swal.fire({
      title: this.retoInfo.nombreReto,
     text:this.retoInfo.descripcionTeoria,
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#31B2C2',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.retoInfo.urlVideo1 !==null){
          Swal.fire({
            title: this.retoInfo.nombreReto,
            html: `<video width="100%" height="auto" controls><source src="${this.retoInfo.urlVideo1}" type="video/mp4"></video>`,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#31B2C2',
            showCancelButton: true,
          })
        }else if(this.retoInfo.urlVideo2 !== null){
          Swal.fire({
            title: this.retoInfo.nombreReto,
            html: `<video width="100%" height="auto" controls><source src="${this.retoInfo.urlVideo2}" type="video/mp4"></video>`,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#31B2C2',
            showCancelButton: true,
          })
        }else if(this.retoInfo.imagenTema1 !==null){
          Swal.fire({
            title: this.retoInfo.nombreReto,
            imageUrl: this.retoInfo.imagenTema1,
            imageWidth: 400,
            imageHeight: 200,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#31B2C2',
            showCancelButton: true,
          })
        }else if(this.retoInfo.imagenTema2 !== null){
          Swal.fire({
            title: this.retoInfo.nombreReto,
            imageUrl: this.retoInfo.imagenTema2,
            imageWidth: 400,
            imageHeight: 200,
            confirmButtonText: 'Continuar',
            confirmButtonColor: '#31B2C2',
            showCancelButton: true,
          })
        }
      }
    })
  }

  colorVerde() {
    Swal.fire({
      title: '¿Qué es un Objeto?',
      html:
      '<p class="explicacion-color">Se trata de un ente abstracto usado en programación que permite separar los diferentes componentes de un programa, simplificando así su elaboración, depuración y posteriores mejoras. Los objetos integran, a diferencia de los métodos procedurales, tanto los procedimientos como las variables y datos referentes al objeto.</p><p> A los objetos se les otorga ciertas características en la vida real. Cada parte del programa que se desea realizar es tratado como objeto, siendo así estas partes independientes las unas de las otras.Los objetos se componen de 3 partes fundamentales: metodos, eventos y atributos.</p>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    });
  }
  colorRojo() {

    Swal.fire({
      title: '¿Que es un método?',
      html:
      '<p>Los métodos son un bloque de instrucciones de código, nos permiten agrupar instrucciones, que despues pueden ser llamadas cuantas veces sea necesario simplemente llamando al método, esto nos permite reutilizar código y resolver problemas cada vez más complejos.</p>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    });
  }
  colorAzul() {
    Swal.fire({
      title: '¿Qué son las variables con valor?',
      html:
      '<p>Una variable se declara para indicarle al programa a partir de qué lugar empieza a existir, qué nombre tendrá y qué tipo de datos almacenará. La asignación de un valor inicial se llama inicialización. Para declarar una variable usaremos una instrucción compuesta del nombre del tipo de datos de la variable, el nombre de la variable y opcionalmente un operador de asignación y un valor inicial.</p>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    });
  }
  colorAmarillo() {
    Swal.fire({
      title: '¿Qué son las varibales?',
      html:
      '<p>Las variables sirven para almacenar números o cadenas de caracteres (palabras). Las instrucciones correspondientes a variables permiten crearlas y usarlas en un programa.</p>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    });
  }


 mostrarInstrucciones(){
  Swal.fire({
    imageUrl: 'https://firebasestorage.googleapis.com/v0/b/languageconquers-740dc.appspot.com/o/Instrucciones.png?alt=media&token=f39ecd45-1865-40d1-bff5-259a3a17e7a9',
    imageWidth: 500,
    imageHeight: 400,
    imageAlt: 'Instrucciones',
    showCloseButton: true,
    showConfirmButton: false
  })
 }

}
