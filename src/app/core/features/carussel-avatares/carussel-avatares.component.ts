import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AvatarService } from '../../../shared/services/avatar/avatar.service';
import { Avatar } from '../../../shared/models/avatar';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { style } from '@angular/animations';


@Component({
  selector: 'app-carussel-avatares',
  templateUrl: './carussel-avatares.component.html',
  styleUrls: ['./carussel-avatares.component.css']
})
export class CarusselAvataresComponent implements OnInit {


  pagina: number = 0;
  avatares: Avatar[] = [];
  avatar: number = 0;
  idSeleccionado: number = 0;
  form: UntypedFormGroup;



  constructor(private avatarService:AvatarService, private fb: UntypedFormBuilder) {
    this.form = fb.group({
      id: ['', Validators.required]
    })
    console.log(this.form.value.id);
   }

  ngOnInit(): void {
    this.getAvatar(this.pagina);
  }

  async getAvatar(page: number){
    await this.avatarService.getAvataresPage(page).toPromise().then((response) => {
      if(response.length <= 0){
        this.pagina = this.pagina-1;
      }else{
        this.avatares = response;
      }
    })
  }

  pasarIzq(){
    if(this.pagina <=0){
      this.pagina = 0;
    }else{
      this.pagina = this.avatares.length -1;
      this.getAvatar(this.pagina);

    }
  }
  pasarDer(){
    this.pagina = this.pagina +1;
    this.getAvatar(this.pagina);

  }
  obtenerId(id: String){
    console.log(id);
  }


  seleccionarAvatar(id:any):number{

    var l = "";
    const images = document.querySelectorAll('img');
    this.idSeleccionado = id;

    let seleccionado = document.getElementById(id.idAvatar);
    l = (seleccionado?.id)?.toString()!;
    console.log(typeof l);
    let n: number = +l;
    this.idSeleccionado = n;
    console.log('id seleccionado: '+ n);
    images.forEach(imagen => {
    imagen.addEventListener('click', function(){
      const active = <HTMLImageElement>document.querySelector('img');
      seleccionado?.classList.remove('active');
      /*console.log(typeof seleccionado?.id);*/
      this.classList.add('active');
    });

   });
   return this.idSeleccionado;

  }



}
