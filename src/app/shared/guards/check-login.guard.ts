import { AuthService } from './../../pages/login/services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  constructor( private authSvc: AuthService ) {}

  canActivate(): Observable<boolean> {
    return this.authSvc.token$.pipe(
      take(1),
      map (token => (!token ? true : false))
    )
  }
}
