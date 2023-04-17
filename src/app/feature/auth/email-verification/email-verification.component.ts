import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'],
  providers: [AuthService]
})
export class EmailVerificationComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSendEmail():void{
    this.authService.emailVerification();
  }

  async verificationEmail(){

    await this.user$.subscribe(res =>{
      if(res && res.emailVerified){
        if(res.emailVerified! == true){
          this.router.navigate(['menuPrincipal'])
        }else{
          this.router.navigateByUrl('/auth/verificar-email', {skipLocationChange: false});
        }
      }
    })
  }
   salir(){
    //await this.authService.logout();
    this.router.navigateByUrl("/auth/login");
    this.authService.logout();

  }
}
