import { User, UserResponse } from './../../../shared/models/user.interface';
import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable, throwError, catchError } from 'rxjs';
import { PerfilResponse } from 'src/app/shared/models/perfil.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient, 
    private router: Router,
    private messageSvc: MessageService) { }

    getUsuarios(): Observable<PerfilResponse[]>{
      return this.http.get<PerfilResponse[]>(`${environment.API_URL}/usuario`)
      .pipe(catchError((error) => this.handlerError(error)));
    }

    newUser(user: any){
      return this.http.post<UserResponse>(`${ environment.API_URL}/usuario`, user)
      .pipe(catchError((error) => this.handlerError(error)));
    }

    editUser(user: any){
      return this.http.put<UserResponse>(`${ environment.API_URL}/usuario`, user)
      .pipe(catchError((error) => this.handlerError(error)));
    }

    deleteUser(cveUsuario: number){
      return this.http.delete<UserResponse>(`${ environment.API_URL}/usuario/${ cveUsuario }`)
      .pipe(catchError((error) => this.handlerError(error)));
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
