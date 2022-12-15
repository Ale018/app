import { PerfilResponse } from './../../../shared/models/perfil.interface';
import { MessageService } from 'primeng/api';
import { UserResponse } from './../../../shared/models/user.interface';
import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //variable para la comunicaión de nuestro token
  private token = new BehaviorSubject<string>("");
  private perfil = new BehaviorSubject<PerfilResponse | null >(null);

  get token$(): Observable<string>{
    return this.token.asObservable();
  }

  get perfil$(): Observable<PerfilResponse | null>{
    return this.perfil.asObservable();
  }
  constructor(private http: HttpClient, 
              private router: Router,
              private messageSvc: MessageService) { 
                this.checkToken();
               }

  login(userData: any): Observable<UserResponse | void> {
    return this.http.post<UserResponse> (`${ environment.API_URL}/auth`, userData)
    .pipe(map((user: UserResponse)=>{

      if (user.code == 0 && user.token){
        this.saveLocalStorage(user.token);
        this.token.next(user.token);
        this.router.navigate (['/']);

        this.checkToken();
      }

      return user;
    }),
    catchError((error) => this.handlerError(error)));

  }

  saveLocalStorage(token: string) {
    localStorage.setItem("token", token);
  }

  logout() {
    localStorage.removeItem("token");
    this.token.next("");
    this.perfil.next(null);
    this.router.navigate(['/']);
  }

  checkToken() {
    const token = localStorage.getItem("token");
    if(token) {
      const isExpired =helper.isTokenExpired(token);
      if (isExpired) {
        this.logout();
      } else {
        this.token.next(token);

        //renovar los datos del perfil
        const{ iat, exp, ...data} = helper.decodeToken(token);
        this.perfil.next(data);
      }
    } else {
      this.logout();
    }

  }

  

  handlerError(error: any): Observable<never> {
    let errorMessage = "Ocurrio un error";
    if (error){
      errorMessage = `${ error.error.message }`;
    }

    //alert(errorMessage);
    this.messageSvc.add(
      {
        severity :'error', 
        summary: 'Ocurrio un error',
        detail: errorMessage}
    );

    return throwError(error);
  }
}
