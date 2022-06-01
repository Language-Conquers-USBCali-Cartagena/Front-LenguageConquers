import { Injectable } from '@angular/core';
import { authInstanceFactory } from '@angular/fire/auth/auth.module';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public userData$: Observable<firebase.User | null>;
  constructor(public afauth: AngularFireAuth) { 
    this.userData$ = afauth.authState;
  }


  async login(email: string, password: string){
 
      return await this.afauth.signInWithEmailAndPassword(email, password);
  
    
  }
  async loginWithGoogle(){

      return await this.afauth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  
    
  }
  register(email: string, password: string){
      return this.afauth.createUserWithEmailAndPassword(email, password);
    
  }
  async loginWithFacebook(){
    return await this.afauth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
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

  async emailVerification(): Promise<void>{
    return (await this.afauth.currentUser)?.sendEmailVerification();
  }

}
