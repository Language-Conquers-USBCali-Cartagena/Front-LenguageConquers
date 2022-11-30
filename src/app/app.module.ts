import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { PaginaPrincipalModule } from './feature/pagina-principal/pagina-principal.module';
import { PerfilEstudianteComponent } from './feature/estudiante/perfil-estudiante/perfil-estudiante.component';
import { MaterialModule } from './shared/material/material.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { CoreModule } from './core/core.module';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AdministradorComponent } from './feature/administrador/administrador.component';





@NgModule({
  declarations: [
    AppComponent,
    PerfilEstudianteComponent,
    AdministradorComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth())

  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
