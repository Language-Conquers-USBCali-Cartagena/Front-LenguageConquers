import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide = true;
  loading = false;

  constructor(private fb: FormBuilder, private _snackbar: MatSnackBar, private router: Router) {
    this.form = this.fb.group({
      usuario:['', Validators.required],
      password:['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  ingresar(){
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    if(usuario =='angela' && password =='123'){
        //redireccionamos a la pagina principal
      this.redireccionPaginaPrincipal();
    }else{
      //mostramos mensaje de error
      this.error();
      this.form.reset();
    }
  }

  // muestra el mensaje de error
  error(){
    this._snackbar.open('El usuario o contraseña son invalidos','',{
      duration:5000,
      horizontalPosition:'center',
      verticalPosition: 'top'
    })
  }

  redireccionPaginaPrincipal(){
    this.loading = true;
    setTimeout(()=>{
      // se debe de redireccionar a la pagina principal
      this.router.navigate(['menuPrincipal'])
    }, 1500);
  }

}
