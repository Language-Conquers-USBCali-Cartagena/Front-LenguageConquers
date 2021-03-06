import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Observable } from 'rxjs';
import { ServiciosLoginService } from '../../../shared/services/Login/servicios-login.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  form: FormGroup;
  hide = true;
  loading = false;
  terminos= true;
  profesorExiste: boolean = false;
  estudianteExiste: boolean = false;
  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService, private loginService: ServiciosLoginService) { 
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    })
  }



  ngOnInit(): void {
  }
  async registrarse() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;


    console.log('El usuario es: ',usuario, password);
    await this.authService.register(usuario, password).then(res => {
      
      this.authService.emailVerification();
      this.router.navigate(['/auth/verificar-email'])
    }).catch(err => {
      this.error();
      this.form.reset();
    });


  }
  IngresarConGoogle() {
    this.authService.loginWithGoogle().then(res => {
      console.log("Ingreso: ", res);
      this.validaciones();
      this.authService.emailVerification();
    }).catch(err => {
      this.error();
    });
  }
  IngresarConFacebook(){
    this.authService.loginWithFacebook().then(res => {
      console.log("Ingreso: ", res);
      this.validaciones();
    }).catch(err => {
      this.error();
    })
  }
  error() {
    this._snackbar.open('El usuario o contrase??a son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  async validarExistenciaBD(email: String){
     
    await this.loginService.existEstudianteByCorreo(email).toPromise().then((response) => {
      this.estudianteExiste = response;
      if(response == true){
        this.router.navigateByUrl("/estudiante/menu")
      }
    })
    await this.loginService.existProfesorByCorreo(email).toPromise().then((response) => {
      this.profesorExiste = response;
      if(response == true){
        this.router.navigateByUrl("/profesor/menu")
      }
    })
  
    if(this.estudianteExiste == true || this. profesorExiste == true){
      return true
    }else {
      return false
    }

  }
  validaciones(){
    this.loading = true;
    setTimeout(() => {
      this.authService.getUserLogged().subscribe(res =>{
        if(res?.email == null){
          this.loading = false;
        }
      })
      let correo= ''; 
      this.user$.subscribe(  res => {
        if(res.emailVerified == false){
          this.router.navigate(['auth/verificar-email'])
        }
        correo = res.email;
        this.validarExistenciaBD(correo).then(resp => {
          if(resp == false){
            this.router.navigateByUrl("/auth/crearUsuario")
          }
        })
        
      }) 

    }, 1500)

  }
  
}
