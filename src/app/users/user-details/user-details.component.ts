import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../app/global';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, AfterContentInit {
  @Input()
  name: string;
  @Input()
  dueDate: string;
  @Input()
  reqStatus: string;
  @Input()
  dueInDays: number;
  display = false;
  requestId: string;
  unm: object;

  constructor(public app: GlobalStorage, private router: Router, private confirmationService: ConfirmationService,
    private route: ActivatedRoute, private commonApiService: CommonApiService, private sharedData: SharedDataService) {
  }

  ngOnInit() {
    if (this.name != null) {
      sessionStorage.setItem('name', this.name);
      this.unm = this.name.split(' ', 2);
      sessionStorage.setItem('dueInDays', this.dueInDays != null ? this.dueInDays.toString() : '0');
      sessionStorage.setItem('dueDate', this.dueDate);
      if (this.reqStatus != null) { sessionStorage.setItem('reqStatus', this.reqStatus); }
    }
    else {
      this.name = sessionStorage.getItem('name');
      this.unm = this.name.split(' ', 2);
      this.dueDate = sessionStorage.getItem('dueDate');
      this.dueInDays = +sessionStorage.getItem('dueInDays');
      this.reqStatus = sessionStorage.getItem('reqStatus');
    }
    this.requestId = sessionStorage.getItem('requestId');
  }
  ngAfterContentInit() {

  }
  cancelRequest() {
    this.display = true;

  }

  cancelDelivery() {
    this.display = false
    const companyId = sessionStorage.getItem('companyId');

    this.commonApiService.putData(GlobalVariable.PUT_CANCEL_REQUEST.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          this.getLatestRequestStatus(this.requestId, companyId);
        },
        err => {
          console.log(err);
        }
      );
  }

  getLatestRequestStatus(requestId, companyId) {

    this.commonApiService.getData(GlobalVariable.GET_REQUEST.replace('${companyId}',
      companyId).replace('${requestId}', requestId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.reqStatus = data.requestStatus;
          this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
            + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);

        },
        err => {
          console.log(err);

        }
      );

  }

  selectTab(activeTabId) {
    this.dueInDays = +sessionStorage.getItem('dueInDays');
    this.router.navigate(['/users/client-details', this.name, this.dueInDays, activeTabId]);
  }

}
