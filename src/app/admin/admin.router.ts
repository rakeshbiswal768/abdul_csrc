import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register/register.component'
import { ForgotPwdComponent } from './account/forgot-pwd/forgot-pwd.component'
import { LoginComponent } from './login/login.component';

export const router: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'trial',
        children: [
            { path: 'register', component: RegisterComponent },
            { path: 'forgot-pwd', component: ForgotPwdComponent },
        ]
    }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
