import { Subject, take, takeUntil } from 'rxjs';
import { PerfilResponse } from './../../models/perfil.interface';
import { AuthService } from './../../../pages/login/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  visible = false;
  items: MenuItem[] = [];
  isLogged= false;
  perfil: PerfilResponse | null | undefined;

  private destroy$ = new Subject<any>();

  constructor(private authSvc: AuthService) { 
    this.authSvc.perfil$
    .pipe(takeUntil(this.destroy$))
    .subscribe( (perfil: PerfilResponse | null)=> {
      if (perfil) {
        this.perfil =perfil;
        this.isLogged =true;
      }
    });
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Ver mi perfil', 
        icon: 'pi pi-user'
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.OnLogout();
        } 
      }
    ]
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  OnLogout(){
    this.authSvc.logout();
    this.isLogged = false;
    this.perfil = null;
  }
}
