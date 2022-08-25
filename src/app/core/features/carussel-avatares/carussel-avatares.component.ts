import { Component, OnInit } from '@angular/core';
import { AvatarService } from '../../../shared/services/avatar/avatar.service';
import { Avatar } from '../../../shared/models/avatar';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-carussel-avatares',
  templateUrl: './carussel-avatares.component.html',
  styleUrls: ['./carussel-avatares.component.css']
})
export class CarusselAvataresComponent implements OnInit {
  pagina: number = 0;
  avatares: Avatar[] = [];
  idAvatar: number = 0;
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
      this.pagina = this.pagina -1;
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
  
}
