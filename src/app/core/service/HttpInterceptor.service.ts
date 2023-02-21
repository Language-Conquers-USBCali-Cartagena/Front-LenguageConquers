import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError } from 'rxjs/operators';
@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    constructor(private router: Router, private auth: AngularFireAuth) {

    }
    token: string | null= '';
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.token = localStorage.getItem('Token');
        const newReq = request.clone({
                setHeaders: {
                    Authorization: `${this.token}`,
                }
            });
            
            return next.handle(newReq).pipe(
                catchError((error:HttpErrorResponse) => {
                    if (error instanceof HttpErrorResponse) {
                        console.log("Error: " + error.status);
            
                        switch (error.status) {
                            case 200:
                                console.log('Funcionaaaaaa');
                                break;
                            case 400:
                                console.log('Error 400');
                                break;
                            case 401:
                                console.log('No tiene acceso');
                                this.router.navigate(['/logout'])
                                break;
                            case 403:
                                console.log("El usuario no esta autirizado");
                                break;
                            case 0:
                                console.log("Error 0");
                                break;
            
                        }
            
                    }
                    return throwError(error);
            
                }
                )
            )



    }
}


