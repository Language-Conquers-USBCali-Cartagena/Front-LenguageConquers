import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { itemsEst } from './menuItemsEst';
import { itemsProf } from './menuItemsProf';
import { AuthService } from '../../service/auth.service';
import { EstudianteServiceService } from '../../../feature/estudiante/services/estudiante-service.service';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
import { ActivatedRoute } from '@angular/router';


interface SideNavToggle{
  screenWidth: number;
  collapsed:boolean;
}
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  animations: [
    trigger('fadeInOut',[
      transition(':enter',[
        style({opacity: 0}),
        animate('350ms',
          style({opacity:1})
        )
      ]),
      transition(':leave',[
        style({opacity: 1}),
        animate('350ms',
          style({opacity:0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset:'0'}),
            style({transform: 'rotate(2turn)', offset:'1'})
          ])
        )
      ])
    ])
  ]
})
export class MenuComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  existeEstu = false;
  collapsed = false;
  email = '';
  screenWidth = 0;
  menuItemsEst = itemsEst;
  menuItemsProf = itemsProf;
  hidden = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  constructor(private loginService:ServiciosLoginService, private authService: AuthService) { }

  ngOnInit(): void {
    
    this.getEmail();
    this.screenWidth = window.innerWidth;


    
  }
  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
  closeSidenav(): void{
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }


  async getEmail(){
    await this.authService.getUserLogged().subscribe(resp => {
      this.email = resp?.email!;

      this.loginService.existEstudianteByCorreo(this.email).toPromise().then((resp) => {
        this.existeEstu = resp;
        
      })
    })
    
  }



}
