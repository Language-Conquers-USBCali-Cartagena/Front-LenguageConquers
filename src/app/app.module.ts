import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { PaginaPrincipalModule } from './feature/pagina-principal/pagina-principal.module';
import { PerfilEstudianteComponent } from './feature/estudiante/perfil-estudiante/perfil-estudiante.component';
import { MaterialModule } from './shared/material/material.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from "@angular/fire/compat";
import { CoreModule } from './core/core.module';
import { FirebaseApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AdminModule } from './feature/admin/admin.module';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { HttpInterceptorService } from './core/service/HttpInterceptor.service';
import { PruebaComponent } from './prueba/prueba/prueba.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';



@NgModule({
  declarations: [
    AppComponent,
    PerfilEstudianteComponent,
    PruebaComponent,
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
 
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    CoreModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStorage(() => getStorage()),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],


})
export class AppModule {


 }
