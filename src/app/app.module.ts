import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { routes } from './app.router';
import { RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { GlobalStorage } from './global';
import { AuthenticationService } from './service/authentication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule, AccordionModule } from 'primeng/primeng';
import { BaseRequestOptions } from '@angular/http';
import { AdminModule } from './admin/admin.module';
import { CommonApiService } from './api/common-api.service'
import { MessageService } from 'primeng/components/common/messageservice';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxSmartLoaderModule.forRoot(),
    routes,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule.forRoot(),
    AdminModule,
    MatSlideToggleModule,
    DragDropModule,
    AccordionModule,
    BrowserModule
  ],
  providers: [
    NgxSmartLoaderService,
    GlobalStorage,
    AuthenticationService,
    CommonApiService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
