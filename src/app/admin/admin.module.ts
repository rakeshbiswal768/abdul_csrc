import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { RouterModule } from "@angular/router";
import { childRoutes } from './admin.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { RegisterComponent } from "./register/register.component"
import { JoinOrgComponent } from './account/join-org/join-org.component';
import { NewAccountComponent } from './account/new-account/new-account.component';
import { ForgotPwdComponent } from './account/forgot-pwd/forgot-pwd.component'
import { LoginComponent } from "./login/login.component";
import { InstructionSentComponent } from './account/instruction-sent/instruction-sent.component'
import { CreatePasswordComponent } from './account/create-password/create-password.component'
import { NewLinkRequestComponent } from './account/new-link-request/new-link-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PricingComponent } from './pricing/pricing.component';
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
    [RegisterComponent,
      LoginComponent,
      JoinOrgComponent,
      NewAccountComponent,
      ForgotPwdComponent,
      InstructionSentComponent,
      CreatePasswordComponent,
      NewLinkRequestComponent,
      PricingComponent]
})
export class AdminModule { }
