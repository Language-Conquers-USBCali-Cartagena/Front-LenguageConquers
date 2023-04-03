import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/service/auth.service';
import { Administrador } from 'src/app/shared/models/administrador';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const usuario = JSON.parse(String(localStorage.getItem('usuario')));
      if(typeof usuario === null){
        await Swal.fire({
          title: 'Error Http: 403',
          text: 'No tiene permisos para acceder a las opciones de administrador',

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
