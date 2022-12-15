import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentosRoutingModule } from './departamentos-routing.module';
import { DepartamentosComponent } from './departamentos.component';
import { DepartamentoDialogComponent } from './components/departamento-dialog/departamento-dialog.component';
import { PrimeNgModule } from 'src/app/primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DepartamentosComponent,
    DepartamentoDialogComponent
  ],
  imports: [
    CommonModule,
    DepartamentosRoutingModule,
    PrimeNgModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ]
})
export class DepartamentosModule { }
