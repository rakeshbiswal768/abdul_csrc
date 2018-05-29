import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { SettingsComponent } from './settings.component';
import { ChangePlanComponent } from './billing/change-plan/change-plan.component';
import { PlanPaymentComponent } from './billing/plan-payment/plan-payment.component';
import { TemplateWizardComponent } from './templates/template-wizard/template-wizard.component';


export const router: Routes = [
    { path: '', component: SettingsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: ':type', component: SettingsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
//    { path: 'start-wizard/:templateId', component: TemplateWizardComponent, canActivate: [AuthGuard], pathMatch: 'full' },
    { path: 'change-plan/:planId', component: ChangePlanComponent, pathMatch: 'full' },
    { path: 'plan-payment/:planId/:isUpgrade', component: PlanPaymentComponent, pathMatch: 'full' }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
