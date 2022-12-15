import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/shared/models/user.interface';
import { MessageService } from 'primeng/api';
import { Observable, throttle, catchError, throwError } from 'rxjs';
import { DepartmentResponse } from 'src/app/shared/models/departamento.interface';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageSvc: MessageService
  ) { }

  getDepas(): Observable<DepartmentResponse[]>{
    return this.http.get<DepartmentResponse[]>(`${environment.API_URL}/departamento`)
      .pipe(catchError((error) => this.handlerError(error)));
  }

  newDepa(depa: any){
    return this.http.post<UserResponse>(`${ environment.API_URL}/departamento`, depa)
    .pipe(catchError((error) => this.handlerError(error)));
  }

  editDepa(depa: any){
    return this.http.put<UserResponse>(`${ environment.API_URL}/departamento`, depa)
    .pipe(catchError((error) => this.handlerError(error)));
  }
  deleteDepa(cveDepartamento: number){
    return this.http.delete<UserResponse>(`${ environment.API_URL}/departamento/${ cveDepartamento }`)
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
