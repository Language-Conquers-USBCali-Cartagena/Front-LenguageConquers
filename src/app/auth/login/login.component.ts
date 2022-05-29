import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;
  fail = true;
  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.redireccion();
  }

  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;


    this.authService.login(usuario, password).then(res => {
      if(res?.user?.emailVerified == true){
        this.fail = false;
        console.log(res);
        this.redireccionPaginaPrincipal();
      }else if(res?.user?.emailVerified == false){
        this.router.navigate(['/auth/verificar-email']);
      }
    }).catch(err => {
      this.error();
      this.form.reset();
    });


  }

  IngresarConGoogle() {
    this.authService.loginWithGoogle().then(res => {
      console.log("Ingreso: ", res);
      this.redireccionPaginaPrincipal();
    }).catch(err => {
      this.error();
    });
  }

  IngresarConFacebook(){
    this.authService.loginWithFacebook().then(res => {
      console.log("Ingreso: ", res);
      this.redireccionPaginaPrincipal();
    }).catch(err => {
      this.error();
    })
  }
  // muestra el mensaje de error
  error() {
    this._snackbar.open('El usuario o contraseña son invalidos', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  redireccionPaginaPrincipal() {
    this.loading = true;
    setTimeout(() => {
      // se debe de redireccionar a la pagina principal
      this.router.navigateByUrl('/menuPrincipal');
    }, 1500)
  }
  redireccion() {
    this.loading = true;
    setTimeout(() => {
      // se debe de redireccionar a la pagina principal
      this.router.navigateByUrl('/menuPrincipal')
      this.authService.getUserLogged().subscribe(res =>{
        if(res?.email == null){
          this.loading = false;
        }
      })
    }, 1500)
  }
  



}
