import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { childRoutes } from './incoming-data-req.router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllReqComponent } from './all-req/all-req.component';
import { YourReqComponent } from './your-req/your-req.component';
import { ToApproveComponent } from './to-approve/to-approve.component';
import { IncomingDataReqComponent } from './incoming-data-req/incoming-data-req.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RadioButtonModule } from 'primeng/primeng';
import { FilterReqPipe } from './filter-req.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    childRoutes,
    NgbModule,
    RadioButtonModule
  ],
  exports: [
    RouterModule
  ],
  declarations:
  [AllReqComponent, YourReqComponent, ToApproveComponent, IncomingDataReqComponent, FilterReqPipe]
})
export class IncomingDataReqModule { }
