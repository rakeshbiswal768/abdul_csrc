import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { RouterModule } from '@angular/router';
import { childRoutes } from './admin.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { NewAccountComponent } from './account/new-account/new-account.component';
import { ForgotPwdComponent } from './account/forgot-pwd/forgot-pwd.component'
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputMaskModule, GrowlModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    InputMaskModule,
    MatStepperModule,
    ReactiveFormsModule,
    childRoutes,
    NgbModule.forRoot(),
    NgxSmartLoaderModule.forRoot()
  ],
  exports: [
    RouterModule
  ],
  providers: [NgxSmartLoaderService],
  declarations:
    [
      LoginComponent,
      NewAccountComponent,
      ForgotPwdComponent,
    ]
})
export class AdminModule { }
