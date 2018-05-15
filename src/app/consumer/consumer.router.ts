import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RequestComponent } from './request/request.component';
import { VerifyRequestComponent } from './verify-request/verify-request.component';
import { DataDownloadComponent } from './data-download/data-download.component';


export const router: Routes = [
    {
        path: '',
        children: [
            { path: 'request/:companyId', component: RequestComponent, pathMatch: 'full' },
            { path: 'verify-request/:companyId', component: VerifyRequestComponent, pathMatch: 'full' },
            { path: 'data-download/:companyId/:deliveryKey', component: DataDownloadComponent, pathMatch: 'full' }
        ]
    }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
