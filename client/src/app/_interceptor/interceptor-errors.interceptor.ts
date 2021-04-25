import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { error } from 'protractor';

@Injectable()
export class InterceptorErrorsInterceptor implements HttpInterceptor {

  constructor(private router:Router,private toast :ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (error) {

          switch (error.status) {
            case 400:
              if(error.error.errors) {
                let modalSatetErrors = [];
                for (let key  in error.error.errors) {
                  if(error.error.errors[key]) {
                    modalSatetErrors.push(error.error.errors[key]);
                  }
                }
                throw modalSatetErrors.flat();
              } else {
                this.toast.error(error.statusText,error.status);
              }
              break;
            case 401: 
            this.toast.error(error.statusText,error.status);
            break;
            case 404:
              console.log(2);
              this.router.navigateByUrl("/not-found");
              break;
            case 500:
              const navigationExtras:NavigationExtras= {state: {error:error.error}};
              this.router.navigateByUrl("/server-error",navigationExtras);
              break;
            default:
              this.toast.error("Somthing goes wrong")
              console.log(error);
              break;
          }
        }
        return throwError(error);
      })
    )
  }
}