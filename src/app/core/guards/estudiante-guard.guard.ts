import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Estudiante } from 'src/app/shared/models/estudiante';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EstudianteGuardGuard implements CanActivate {
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      const usuario: Estudiante = JSON.parse(String(localStorage.getItem('usuario')));
      if(typeof usuario.idEstudiante === "undefined"){
        await Swal.fire({
          title: '403',
          text: 'No tiene permisos para acceder a las opciones de estudiante.',
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
