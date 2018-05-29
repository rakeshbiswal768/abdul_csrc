import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AsyncPipe } from '@angular/common';
import { routes } from './app.router';
import { RequestOptions } from '@angular/http';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './shared/search/search.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { PendingRequestComponent } from './shared/pending-request/pending-request.component';
import { RecentActivityComponent } from './shared/recent-activity/recent-activity.component';
import { UsersComponent } from './users/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GlobalStorage } from './global';
import { AuthenticationService } from './service/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import 'hammerjs';
import { MatSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule, AccordionModule } from 'primeng/primeng';

// used to create fake backend
// import { fakeBackendProvider } from './helper/fake-backend';
// import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions } from '@angular/http';
import { CurrentRequestComponent } from './shared/current-request/current-request.component';
import { AdminModule } from './admin/admin.module';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AddHeaderInterceptor } from './interceptor'
import { CommonApiService } from './api/common-api.service'
import { MessageService } from 'primeng/components/common/messageservice';
import { MyToApproveComponent } from './shared/my-to-approve/my-to-approve.component';
import { HeaderComponent } from './shared/header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    SearchComponent,
    DropdownComponent,
    PendingRequestComponent,
    RecentActivityComponent,
    DashboardComponent,
    CurrentRequestComponent,
    MyToApproveComponent,
    HeaderComponent
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
    AuthGuard,
    CommonApiService,
    // [{
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AddHeaderInterceptor,
    //   multi: true,
    // }],
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
