import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User | null>;
  constructor(private afauth: AngularFireAuth) { 
    this.userData$ = afauth.authState;
  }


  async login(email: string, password: string){
    try {
      return await this.afauth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error en el login: ', error);
      return null;
    }
  }
  async loginWithGoogle(){
    try {
      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch (error) {
      console.log('Error en el login con Google: ',error);
      return null;
    }
  }
  async register(email: string, password: string){
    try {
      return await this.afauth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.log('Error creando el usuario: ',error);
      return null;
    }
  }

  getUserLogged(){
    return this.afauth.authState;
  }

  logout(){
    this.afauth.signOut();
  }
  async recuperarContraseña(email: string){
    await this.afauth.sendPasswordResetEmail(email);
  }
}
