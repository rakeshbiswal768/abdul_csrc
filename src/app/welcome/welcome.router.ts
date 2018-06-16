import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';

export const router: Routes = [
    { path: 'step1', component: Step1Component },
    { path: 'step2', component: Step2Component },
];

export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
