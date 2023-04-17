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
            
                        switch (error.status) {
                            case 200:
                                break;
                            case 400:
                                break;
                            case 401:
                                this.router.navigate(['/logout'])
                                break;
                            case 403:
                                break;
                            case 0:
                                break;
            
                        }
            
                    }
                    return throwError(error);
            
                }
                )
            )



    }
}


