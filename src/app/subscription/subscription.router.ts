import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ChoosePlanComponent } from './choose-plan/choose-plan.component'
import { PaymentDetailsComponent } from './payment-details/payment-details.component'
import { PaymentComponent } from './payment/payment.component';
import { CompanyInfoComponent } from './company-info/company-info.component';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { UpgradePlanComponent } from './upgrade-plan/upgrade-plan.component'

export const router: Routes = [{
    path: '',
    children: [
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        { path: 'choose-plan', component: ChoosePlanComponent },
        { path: 'upgrade-plan', component: UpgradePlanComponent },
        { path: 'payment-details/:plan', component: PaymentDetailsComponent },
        { path: 'payment/:plan', component: PaymentComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'company-info/:plan', component: CompanyInfoComponent },
        { path: 'company-info', component: CompanyInfoComponent },
        { path: 'contact-info/:plan', component: ContactInfoComponent },
        { path: 'contact-info', component: ContactInfoComponent }
    ]
}
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
