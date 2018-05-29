import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../guards/auth.guard';
import { UserprofileComponent } from './userprofile/userprofile.component'
import { UsersComponent } from './users/users.component'
import { AddDataManualComponent } from './add-data-manual/add-data-manual.component'
import { ImportDataComponent } from './import-data/import-data.component'
import { ImportFileComponent } from './import-file/import-file.component'
import { DataEncrptComponent } from './import-data/data-encrpt/data-encrpt.component'
import { ClientDetailsComponent } from './client-details/client-details.component'
import { MessagesComponent } from './messages/messages.component'
import { CrcComponent } from './crc/crc.component'


export const router: Routes = [{
    path: '',
    children: [
        { path: 'users', component: UsersComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'user-profile', component: UserprofileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'user-profile/:name/:dueDate', component: UserprofileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'user-profile-req/:requestId/:reqStatus/:dueInDays/:name/:dueDate', component: UserprofileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'add-manual', component: AddDataManualComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'add-manual/:requestId', component: AddDataManualComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'import-data', component: ImportDataComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'import-data/:requestId', component: ImportDataComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'import-data/:requestId/:informationTypeId', component: ImportDataComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'import-file', component: ImportFileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'import-file/:requestId', component: ImportFileComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'data-encrpt/:name', component: DataEncrptComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'data-encrpt-data/:requestId/:reqStatus/:dueInDays/:name/:dueDate', component: DataEncrptComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'client-details/:name/:dueDate/:activeTabId', component: ClientDetailsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'client-details-req/:requestId/:reqStatus', component: ClientDetailsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'client-details', component: ClientDetailsComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: 'crc', component: CrcComponent, canActivate: [AuthGuard], pathMatch: 'full' },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
}
];
// { path: "users", component: UsersComponent, canActivate: [AuthGuard] },
export const childRoutes: ModuleWithProviders = RouterModule.forChild(router);
