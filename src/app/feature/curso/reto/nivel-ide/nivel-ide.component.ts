import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PalabrasReservadas } from 'src/app/shared/models/palabrasReservadas';
import { SideNavToggle } from 'src/app/shared/models/sideNavToggle';
import { PalabraReservadaService } from 'src/app/shared/services/palabraReservada/palabraReservada.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nivel-ide',
  templateUrl: './nivel-ide.component.html',
  styleUrls: ['./nivel-ide.component.css']
})
export class NivelIDEComponent implements OnInit {

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

  constructor(private router: Router, private palabraService: PalabraReservadaService) { }

  async ngOnInit() {
    this.mostrarPistas();
    await this.ObtenetPalabras();
  }
  ObtenetPalabras(){
    this.palabraService.getPalabrasReservadas().subscribe(data => {
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
    resp.forEach(resp => { console.log(resp);
    })
    // this.palabraService.procesarPalabras(resp).subscribe(resp =>{
    //   console.log(resp);

    // });

    Swal.fire({
      title: 'Sweet!',
      text: 'Aqui va el texto de explicación',
      html:
        '<iframe width="440" height="315" src="https://www.youtube.com/embed/HD_zesxhkC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false
    })

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
    this.router.navigateByUrl('curso/mapa/1');
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
      title: 'Sweet!',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sit amet scelerisque risus. Aliquam erat volutpat. Ut convallis tempus varius. Mauris nec fermentum libero. Donec maximus iaculis urna id sollicitudin. Proin tempus velit elit, ac suscipit odio tempor quis. Nam lacinia turpis nibh, ac commodo nulla vehicula vitae. Praesent venenatis mauris nec efficitur feugiat. Nunc fringilla posuere neque, varius facilisis risus laoreet et. Integer consequat bibendum vehicula.Donec nec dui porta, ultricies lectus et, rutrum ligula. Maecenas scelerisque lacinia ex, vitae laoreet ipsum varius vitae.',
      confirmButtonText: 'Continuar',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Sweet!',
          text:'Maecenas sit amet eros nisl. Aliquam vitae aliquam erat. In malesuada non quam id tincidunt. Nulla at sapien ullamcorper, pharetra turpis vel, congue leo. Integer ut turpis tempus, suscipit velit id, malesuada sem. Curabitur tellus nibh, maximus id arcu quis, blandit tristique libero. Pellentesque vitae nunc ac nibh lacinia molestie sed quis urna. Ut faucibus blandit nunc et sodales. Donec ornare erat tortor, et mollis risus viverra id. Pellentesque vitae justo lacinia, ornare odio id, imperdiet eros. Curabitur tortor dolor, sodales euismod semper non, cursus ac ex. Integer hendrerit est ac ipsum elementum sollicitudin. Mauris sapien eros, sollicitudin sit amet dui mollis, ornare sagittis justo. Maecenas porta, ex quis condimentum porta, nisi ex efficitur diam, vehicula dignissim tortor eros eget mauris. Donec facilisis ante a ipsum sollicitudin, nec dictum lorem iaculis. Quisque blandit enim sem, lacinia vehicula sapien mattis id. Nam aliquam sapien in urna aliquet viverra.',
          confirmButtonText: 'Continuar',
        }

      )
      }
    })
  }



}
