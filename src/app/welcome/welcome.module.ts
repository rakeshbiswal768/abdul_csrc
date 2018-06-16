import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSmartLoaderModule, NgxSmartLoaderService } from 'ngx-smart-loader';
import { RouterModule } from '@angular/router';
import { childRoutes } from './welcome.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
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
      Step1Component,
      Step2Component
    ]
})
export class WelcomeModule { }
