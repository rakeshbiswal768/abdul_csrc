import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { childRoutes } from './consumer.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RequestComponent } from './request/request.component';
import { VerifyRequestComponent } from './verify-request/verify-request.component';
import { ConsumerService } from './consumer.service';
import { InputSwitchModule } from 'primeng/primeng';
import { DataDownloadComponent } from './data-download/data-download.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        childRoutes,
        InputSwitchModule
    ],
    providers: [
        ConsumerService

    ],
    exports: [
        RouterModule
    ],
    declarations:
        [RequestComponent,
            VerifyRequestComponent,
            DataDownloadComponent]
})
export class ConsumerModule { }
