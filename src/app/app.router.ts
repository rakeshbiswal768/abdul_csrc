import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';



export const router: Routes = [
    // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    // { path: 'incoming-data', loadChildren: 'app/incoming-data-req/incoming-data-req.module#IncomingDataReqModule' },
    // { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
    // { path: 'users', loadChildren: 'app/users/users.module#UsersModule' },
    // { path: 'reports', loadChildren: 'app/reports/report.module#ReportModule' },
    // { path: 'registered', loadChildren: 'app/subscription/subscription.module#SubscriptionModule' },
    // { path: 'consumer', loadChildren: 'app/consumer/consumer.module#ConsumerModule' },
    // { path: 'trial', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'registered', redirectTo: '/dashboard', pathMatch: 'full' },
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    // { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router, { preloadingStrategy: PreloadAllModules });
