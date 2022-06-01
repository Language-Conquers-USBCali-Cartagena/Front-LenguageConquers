import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  hide = true;
  loading = false;
  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService) { 
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
      this.redireccionPaginaPrincipal();
      this.authService.emailVerification();
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
      this.authService
      this.router.navigateByUrl('/menuPrincipal');
    }, 1500)
  }
}
