import { UserResponse } from './../../shared/models/user.interface';
import { AuthService } from './services/auth.service';
import { Baseform } from './../../shared/utils/base-form';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{

  private destroy$ = new Subject<any>();
  
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, public baseForm: Baseform, private authSvc: AuthService) { }
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onLogin (){
    var data = this.loginForm.getRawValue();

    this.authSvc.login(data)
    .pipe(takeUntil(this.destroy$))
    .subscribe( (user: UserResponse |void) => {
      console.log("LOGIN:", user);
    });
  }
  
}
