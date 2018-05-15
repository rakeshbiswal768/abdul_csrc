import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { IncomingDataReqComponent } from './incoming-data-req/incoming-data-req.component'


export const router: Routes = [
    { path: '', component: IncomingDataReqComponent, pathMatch: 'full' },
    { path: ':reqStatus', component: IncomingDataReqComponent, pathMatch: 'full' }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
