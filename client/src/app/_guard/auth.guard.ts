import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AccountService } from '../_services/account.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountServcie:AccountService,private toast:ToastrService) {};
  
  canActivate(): Observable<boolean> {
   return this.accountServcie.currentUser$.pipe(
      map(user=> {
      
        if (user) return true;
        this.toast.error("You shall not pass");
        return false;
      })
    )
  }
  
}
