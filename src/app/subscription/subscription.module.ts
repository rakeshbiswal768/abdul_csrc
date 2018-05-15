import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component';
import { childRoutes } from './subscription.router';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentComponent } from './payment/payment.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UpgradePlanComponent } from './upgrade-plan/upgrade-plan.component';

@NgModule({
  imports: [
    CommonModule,
     FormsModule,
    ReactiveFormsModule,
    childRoutes
  ],
  exports: [
        RouterModule
    ],
  declarations: [ChoosePlanComponent, PaymentDetailsComponent, PaymentComponent, CompanyInfoComponent, ContactInfoComponent, UpgradePlanComponent]
})
export class SubscriptionModule { }
