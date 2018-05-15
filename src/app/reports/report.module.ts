import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { childRoutes } from './report.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportsComponent } from './reports.component';
import { FilterUserPipe } from './audit-log/filter-user.pipe';
import { FilterReqByPipe } from './audit-log/filter-req-by.pipe';
import { FilterActionTakenPipe } from './audit-log/filter-action-taken.pipe';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { DeviationsComponent } from './deviations/deviations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
        [ReportsComponent,
            AuditLogComponent,
            DeviationsComponent,
            FilterUserPipe,
            FilterReqByPipe,
            FilterActionTakenPipe,
        ]
})
export class ReportModule { }
