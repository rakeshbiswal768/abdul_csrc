import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { childRoutes } from './pendinguser.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PendingusersComponent } from './pendingusers.component';
import { AllRequestsComponent } from './all-requests/all-requests.component';
import { YourRequestsComponent } from './your-requests/your-requests.component';
import { ToApproveComponent } from './to-approve/to-approve.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        childRoutes,
        NgbModule
    ],
    providers: [
    ],
    exports: [
        RouterModule

    ],
    declarations:
        [PendingusersComponent,
            AllRequestsComponent,
            YourRequestsComponent,
            ToApproveComponent
        ]
})
export class PendingUserModule { }
