import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { PendingusersComponent } from './pendingusers.component';


export const router: Routes = [
    { path: 'pendingusers', component: PendingusersComponent, canActivate: [AuthGuard] }
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
