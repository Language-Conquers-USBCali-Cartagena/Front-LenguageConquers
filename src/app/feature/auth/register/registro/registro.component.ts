import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/service/auth.service';
import { Observable } from 'rxjs';
import { ServiciosLoginService } from '../../../../shared/services/Login/servicios-login.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2'
import { contains } from '@firebase/util';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public user$:Observable<any> = this.authService.afauth.user;
  form: UntypedFormGroup;
  hide = true;
  loading = false;
  terminos= false;
  profesorExiste: boolean = false;
  estudianteExiste: boolean = false;
  constructor(private fb: UntypedFormBuilder, private _snackbar: MatSnackBar, private router: Router, private authService: AuthService, private loginService: ServiciosLoginService, private dialog: MatDialog) {
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
    await this.authService.register(usuario, password).then(res => {
      this.authService.emailVerification();
      this.router.navigate(['/auth/verificar-email'])
    }).catch(err => {
      if(this.terminos == false){
        this.errorTerminos();
      }else if(password.length<6){
        this.passwordInvalid();
      }else{
        this.error();
      }
      this.form.reset();
    });

  }
  IngresarConGoogle() {
    this.authService.loginWithGoogle().then(res => {
      console.log("Ingreso: ", res);
      this.validaciones();
    }).catch(err => {
      if(this.terminos == false){
        this.errorTerminos();
      }else{
        this.error();
      }
    });
  }
  IngresarConFacebook(){
    this.authService.loginWithFacebook().then(res => {
      console.log("Ingreso: ", res);
      this.validaciones();
    }).catch(err => {
      if(this.terminos == false){
        this.errorTerminos();
      }else{
        this.error();
      }
    })
  }
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
      title: 'El usuario o contraseña son inválidos.'
    })
  }

  errorTerminos() {
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
      title: 'Debe aceptar los términos y condiciones.'
    })
  }

  async validarExistenciaBD(email: string){

    await this.loginService.existEstudianteByCorreo(email).toPromise().then((response) => {
      this.estudianteExiste = response;
      if(response == true){
        localStorage.setItem("correo", email);
        this.router.navigateByUrl("/estudiante/menu")
      }
    })
    await this.loginService.existProfesorByCorreo(email).toPromise().then((response) => {
      this.profesorExiste = response;
      if(response == true){
        localStorage.setItem("correo", email);
        this.router.navigateByUrl("/profesor/menuProfesor")
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

  terminosCondiciones() {
    Swal.fire({
      title: 'Términos y Condiciones',
      text: 'Al visitar nuestro sitio, usted interactúa con nuestro "Servicio" y reconoce como vinculantes los siguientes términos y condiciones (denominados en lo sucesivo "Términos del servicio", "Términos"), incluidos aquellos términos y condiciones adicionales y las políticas que se mencionan aquí y/o disponibles por medio de hipervínculo. Estos Términos del servicio se aplican a todos los usuarios del sitio, incluyendo de manera enunciativa mas no limitativa los usuarios que son navegadores, proveedores, clientes, comerciantes y/o que aporten contenido. Lea estos Términos del servicio detenidamente antes de acceder o utilizar nuestra página web. Al acceder o utilizar cualquier parte del sitio, usted acepta estos Términos del servicio. Si no acepta la totalidad de los términos y condiciones de este acuerdo, no podrá acceder al sitio web ni utilizar ningún servicio. Si estos Términos del servicio se considerasen una oferta, la aceptación se limita expresamente a los presentes Términos del servicio.',
      input: 'checkbox',
      confirmButtonColor: '#31B2C2',
      inputPlaceholder: 'Acepto términos y condiciones.',
      backdrop: '',
    }).then((result) => {
      if (result.isConfirmed) {
        if (result.value) {
          Swal.fire({ icon: 'success', text: 'Has aceptado los términos y condiciones.' ,confirmButtonColor: '#31B2C2',});
          this.terminos = true;
        } else {
          Swal.fire({ icon: 'error', text: "Es necesario aceptar los términos y condiciones para registrase.", confirmButtonColor: '#31B2C2',});
          this.terminos = false;
        }

      } else {
        console.log(`modal was dismissed by ${result.dismiss}`)
      }
    })
  }

  passwordInvalid() {
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
      title: 'La contraseña debe contener mínimo 6 caracteres.'
    })
  }
}
