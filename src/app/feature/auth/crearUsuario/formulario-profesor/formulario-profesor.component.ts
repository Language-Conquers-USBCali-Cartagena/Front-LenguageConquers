import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Genero } from '../../../../shared/models/genero';
import { GeneroService } from '../../../../shared/services/genero/genero.service';
import { ServiciosLoginService } from '../../../../shared/services/Login/servicios-login.service';
import { Profesor } from '../../../../shared/models/profesor';
import { Observable } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-profesor',
  templateUrl: './formulario-profesor.component.html',
  styleUrls: ['./formulario-profesor.component.css']
})
export class FormularioProfesorComponent implements OnInit {
  form: UntypedFormGroup;
  generos: Genero[] = [];
  correo: string = '';
  public user$:Observable<any> = this.authService.afauth.user;

  constructor(private fb: UntypedFormBuilder, private generoService: GeneroService, private loginService: ServiciosLoginService, private authService: AuthService, private router: Router) {

    this.form = this.fb.group({
      nombre:  ['', Validators.required],
      apellido: ['', Validators.required],
      genero: ['', Validators.required],
    })
   }

  ngOnInit(): void {
    this.user$.subscribe(res =>
      {this.correo = res.email
      console.log(this.correo)
    });
    this.getGenero();
  }
  crearProfesor(){

    const correo = this.correo;
    const nombre = this.form.value.nombre;
    const apellido = this.form.value.apellido;
    const foto = 'https://cdn-icons-png.flaticon.com/512/257/257667.png';
    const usuarioCreador = this.form.value.nombre + this.form.value.apellido;
    const genero = this.form.value.genero.idGenero;
    let profesor: Profesor = {
      nombre: nombre, 
      apellido: apellido,
      correo:correo, 
      foto:foto, 
      usuarioCreador: usuarioCreador, 
      fechaCreacion:new Date(), 
      idGenero: genero}
    this.loginService.createProfesor(profesor).subscribe(resp => {
      localStorage.setItem("usuario", JSON.stringify(profesor));

      Swal.fire({
        icon: 'success',
        title: resp,
        showConfirmButton: false,
        timer: 2000
      });
      this.router.navigateByUrl('/profesor/menuProfesor');
    }, err => {
      console.log(err['error']);
      Swal.fire({ icon: 'error', text: err['error'], confirmButtonColor: '#33b5e5',});
      this.router.navigateByUrl('/auth/crearUsuario');
      }

    );

  }

  getGenero(){
      this.generoService.getGenero().subscribe(resp => this.generos = resp);
  }
  salir(){
    this.authService.logout()
    this.router.navigateByUrl("/auth/login");
  }
}

