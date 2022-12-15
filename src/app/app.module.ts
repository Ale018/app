import { LoadingInterceptor } from './shared/interceptors/loading.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './primeng.module';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InformacionComponent } from './shared/components/informacion/informacion.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    InformacionComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    PrimeNgModule,
    FormsModule,
    NgxSpinnerModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS , useClass: LoadingInterceptor, multi: true },
    MessageService, DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
