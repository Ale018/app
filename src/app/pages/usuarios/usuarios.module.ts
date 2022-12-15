import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { PrimeNgModule } from 'src/app/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosDialogComponen } from './components/usuarios-dialog/usuarios-dialog.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosDialogComponen
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class UsuariosModule { }
