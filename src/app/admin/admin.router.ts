import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NewAccountComponent } from './account/new-account/new-account.component';
import { ForgotPwdComponent } from './account/forgot-pwd/forgot-pwd.component'
import { LoginComponent } from './login/login.component';
import { CrcComponent } from './crc/crc.component';

export const router: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-pwd', component: ForgotPwdComponent },
    { path: 'new-account', component: NewAccountComponent },
    { path: 'crc', component: CrcComponent }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
