import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: 'productos', 
    loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule) 
  }, 
  { 
    path: '',
   loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.InicioModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule),
    canActivate: [ CheckLoginGuard]
  },
  { path: 'usuarios', loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule) },
  { path: 'departamentos', loadChildren: () => import('./pages/departamentos/departamentos.module').then(m => m.DepartamentosModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
