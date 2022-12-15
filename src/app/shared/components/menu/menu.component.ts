import { PerfilResponse } from './../../models/perfil.interface';
import { AuthService } from './../../../pages/login/services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuResponse } from '../../models/menu.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy{

  menus: MenuResponse [] =[];
  selectedMenu: MenuResponse = {icon : '', nombre: '', url:'/'};

  private destroy$ = new Subject<any>();

  constructor(private router: Router,
              private authSvc: AuthService) { }

  ngOnInit(): void {
    this.menus =[
      {
        icon:'', nombre:'Inicio', url:'/'
      }, 
      {
        icon:'', nombre:'Iniciar Sesión', url:'/login'
      },
      {
        icon: '', nombre: 'Departamentos', url: '/departamentos'
      }
    ];

    this.authSvc.perfil$
        .pipe(takeUntil(this.destroy$))
        .subscribe((perfil: PerfilResponse | null)=>{
          if(perfil){
            this.menus = [
              {
                icon: '', nombre: 'Inicio', url: '/'
              },
              {
                icon: '', nombre: 'Usuarios', url: '/usuarios'
              },
              {
                icon: '', nombre: 'Productos', url: '/productos'
              },
              {
                icon: '', nombre: 'Departamentos', url: '/departamentos'
              }
            ];
          }
        });
    
  }

  ngOnDestroy(): void {
    this.destroy$.next({});
    this.destroy$.complete();
  }

  onNavigate() {
    this.router.navigate([this.selectedMenu.url]);
  }

}
