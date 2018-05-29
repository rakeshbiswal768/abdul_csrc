import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register/register.component'
import { JoinOrgComponent } from './account/join-org/join-org.component';
import { NewAccountComponent } from './account/new-account/new-account.component';
import { ForgotPwdComponent } from './account/forgot-pwd/forgot-pwd.component'
import { LoginComponent } from './login/login.component';
import { InstructionSentComponent } from './account/instruction-sent/instruction-sent.component'
import { CreatePasswordComponent } from './account/create-password/create-password.component'
import { NewLinkRequestComponent } from './account/new-link-request/new-link-request.component';
import { PricingComponent } from './pricing/pricing.component';

export const router: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'trial',
        children: [
            { path: 'pricing', component: PricingComponent },
            { path: 'register/:plan/:planId', component: RegisterComponent },
            // { path: 'register/:plan', component: RegisterComponent },
            // { path: 'join-org', component: JoinOrgComponent },
            { path: 'newaccount', component: NewAccountComponent },
            { path: 'new-account/:isNewAccount', component: CreatePasswordComponent }, //Create a password for new company
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-pwd', component: ForgotPwdComponent },
            { path: 'forgot-pwd/:isLinkValid', component: ForgotPwdComponent },
            { path: 'inst-sent', component: InstructionSentComponent },
            { path: 'inst-sent/:welcomeUser', component: InstructionSentComponent },
            // { path: 'create-pwd', component: CreatePasswordComponent },
            { path: 'create-pwd/:isExistingAccount', component: CreatePasswordComponent },
            { path: 'newlink-request', component: NewLinkRequestComponent },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    },
    {
        path: 'registered',
        children: [
            { path: 'register/:plan', component: RegisterComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
