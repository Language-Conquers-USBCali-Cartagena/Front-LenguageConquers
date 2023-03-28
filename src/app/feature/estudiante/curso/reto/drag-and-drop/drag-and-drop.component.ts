import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PalabrasReservadas } from 'src/app/shared/models/palabrasReservadas';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { PalabraReservadaService } from 'src/app/shared/services/palabraReservada/palabraReservada.service';
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
  constructor(private router: Router, private palabraService: PalabraReservadaService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.mostrarPistas();
    this.retoParam = this.route.snapshot.params['reto']
    await this.ObtenetPalabras();
  }

  ObtenetPalabras(){
    this.palabraService.getPalabrasReservadas(this.retoParam).subscribe(data => {
      this.palabras = data;
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
    this.palabraService.procesarPalabras(resp, true).subscribe(resp =>{
      console.log(resp);
      Swal.fire({
        title: 'Respuesta!',
        text: resp,
        focusConfirm: false,
        showCancelButton: true,
        showConfirmButton: false
      });
    }, error => {
      if(error instanceof HttpErrorResponse){
        console.log(error.error);
        Swal.fire({
          title: 'Error',
          text: error.error,
          focusConfirm: false,
          confirmButtonText: 'Intentar',
          confirmButtonColor: '#31B2C2',
        });
      }else {
        console.log(error.message);
        Swal.fire({
          title: 'Error',
          text: error.message,
          focusConfirm: false,
          confirmButtonText: 'Intentar',
          confirmButtonColor: '#31B2C2',
        });
      }
    });

    // Swal.fire({
    //   title: 'Sweet!',
    //   text: 'Aqui va el texto de explicación',
    //   html:
    //     '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    //   showCloseButton: true,
    //   focusConfirm: false,
    //   showConfirmButton: false
    // })

  }

  organizar(lista: PalabrasReservadas[], numeroLista: number){
    for(let i = 0; i < lista.length; i ++){

      lista[i].orden = i +1;
      lista[i].lista = numeroLista;
      console.log(lista[i].nombre + ' ' + lista[i].orden + ' ' + lista[i].lista);

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
      title: '¿Qué es un algoritmo?',
      html:
      '<p>Un algoritmo es en realidad un procedimiento por etapas. Es un conjunto de reglas que hay que seguir para realizar una tarea o resolver un problema.</p> Un algoritmo es en realidad un procedimiento por etapas. Es un conjunto de reglas que hay que seguir para realizar una tarea o resolver un problema. <p>Mucho antes de la aparición de los ordenadores, los humanos ya utilizaban algoritmos. Las recetas de cocina, las operaciones matemáticas o incluso las instrucciones para montar un mueble pueden considerarse algoritmos.</p>',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#31B2C2',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¿Qué es un algoritmo?',
          text:'En el campo de la programación informática, los algoritmos son conjuntos de reglas que indican al ordenador cómo ejecutar una tarea. En realidad, un programa informático es un algoritmo que indica al ordenador qué pasos debe realizar y en qué orden para llevar a cabo una tarea específica. Se escriben utilizando un lenguaje de programación.',
          showCancelButton: true,
          confirmButtonColor: '#31B2C2'
        }

      )
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



}
