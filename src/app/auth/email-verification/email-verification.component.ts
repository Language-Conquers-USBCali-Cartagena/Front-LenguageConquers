import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  providers: [AuthService]
})
export class EmailVerificationComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  constructor(private authService: AuthService, private router: Router) { 
  }

  ngOnInit(): void {
    
  }

  onSendEmail():void{
    this.authService.emailVerification();    
  }

  async verificationEmail(){
    
    await this.user$.subscribe(res =>{
      if(res.emailVerified == true){
        this.router.navigate(['menuPrincipal'])
      }else{
        setTimeout(() => {
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigateByUrl('/auth/verificar-email', {skipLocationChange: false});
          console.log('Redireccionando');
        }, 5000)
      }
      
    })
  }
  async salir(){
    await this.authService.logout();
    this.router.navigateByUrl("/auth/login");
    
  }
}
