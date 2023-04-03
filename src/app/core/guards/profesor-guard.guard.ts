import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Profesor } from 'src/app/shared/models/profesor';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ProfesorGuardGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const usuario: Profesor = JSON.parse(String(localStorage.getItem('usuario')));
      if(usuario == null){
        await Swal.fire({
          title: 'Error Http: 403',
          text: 'No tiene permisos para acceder a las opciones de profesor',

          focusConfirm: false,
          confirmButtonText: 'Regresar',
          confirmButtonColor: '#31B2C2',
        })
        window.history.go(-1);
        return false;
      }
      if(typeof usuario.idProfesor === "undefined"){
        await Swal.fire({
          title: 'Error Http: 403',
          text: 'No tiene permisos para acceder a las opciones de profesor',
          focusConfirm: false,
          confirmButtonText: 'Regresar',
          confirmButtonColor: '#31B2C2',
        })
        window.history.go(-1);
        return false;
      }else{
        return true;
      }
  }


}
