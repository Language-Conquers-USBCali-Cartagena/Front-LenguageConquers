import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';
import { PaginaPrincipalModule } from './pagina-principal/pagina-principal.module';
import { PerfilEstudianteComponent } from './perfil-estudiante/perfil-estudiante.component';
import { MaterialModule } from './material/material.module';
import { NavbarComponent } from './pagina-principal/navbar/navbar.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFireModule } from "@angular/fire/compat";

@NgModule({
  declarations: [
    AppComponent,
    PerfilEstudianteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    PaginaPrincipalModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)




  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
