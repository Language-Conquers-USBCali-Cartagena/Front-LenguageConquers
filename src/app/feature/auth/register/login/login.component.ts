import { Component, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { ServiciosLoginService } from '../../../../shared/services/Login/servicios-login.service';
import { Observable } from 'rxjs';


import Swal from 'sweetalert2'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService],
})
export class LoginComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  form: UntypedFormGroup;
  hide = true;
  loading = false;
  fail = true;
  profesorExiste: boolean = false;
  estudianteExiste: boolean = false;
  userEmail = new UntypedFormControl('');

  constructor(private fb: UntypedFormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService, private loginService: ServiciosLoginService) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.validaciones()
  }


  ingresar() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;


    this.authService.login(usuario, password).then(res => {
      if(res?.user?.emailVerified == true){
        this.fail = false;
        console.log(res);
        this.validaciones();
      }else if(res?.user?.emailVerified == false){
        this.router.navigate(['/auth/verificar-email']);
      }
    }).catch(err => {
      this.error();
      this.form.reset();
    });
  }

  IngresarConGoogle() {
    // this.validarExistenciaBD('wefohef@wge.com')
    this.authService.loginWithGoogle().then(res => {
      console.log("Ingreso: ", res);
      this.validaciones();
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
  // muestra el mensaje de error
  error() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'info',
      title: 'El usuario o contraseña son inválidos'
    })

  }

  async validarExistenciaBD(email: string){

    await this.loginService.existProfesorByCorreo(email).toPromise().then((response) => {
      this.profesorExiste = response;
      if(response == true){
        localStorage.setItem("correo", email);
        this.router.navigateByUrl("/profesor/menuProfesor");
      }
    })
    await this.loginService.existEstudianteByCorreo(email).toPromise().then((response) => {
      this.estudianteExiste = response;
      if(response == true){
        localStorage.setItem("correo", email);
        this.router.navigateByUrl("/estudiante/menu")
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

  async recuperarPassword(){
    const {value: email} = await Swal.fire({
      title: 'Restablecer Contraseña',
      input: 'email',
      inputLabel: 'Ingrese la dirección de correo electronico asociado a la cuenta de Language Conquers',
      inputPlaceholder: 'Email',
      confirmButtonColor: '#c98345',
    })


    if (email){
      Swal.fire({ icon: 'success', text:'Se envio el correo a ${email}, revisa tú bandeja'});
      await this.authService.recuperarContraseña(email);
    }
    }
}
