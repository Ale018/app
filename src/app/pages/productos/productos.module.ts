import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from './../../primeng.module';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosComponent } from './productos.component';


@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    PrimeNgModule
  ]
})
export class ProductosModule { }
