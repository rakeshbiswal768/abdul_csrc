import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ReportsComponent } from './reports.component';
import { AuthGuard } from '../guards/auth.guard';


export const router: Routes = [
    { path: '', component: ReportsComponent, canActivate: [AuthGuard], pathMatch: 'full' }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
