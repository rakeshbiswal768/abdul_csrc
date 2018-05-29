import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable } from '../../../global';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  pageTitle = 'Audit log';
  defaultUser = 'Select';
  model = { user: this.defaultUser };
  auditlog: any;
  serverError = null;
  loader: boolean = true;

  constructor(private commonApiService: CommonApiService) { }

  ngOnInit() {
    this.getAuditLog();
  }

  getAuditLog() {
    const companyId = sessionStorage.getItem('companyId');
    const clientId = sessionStorage.getItem('name');
    //this.auditlog = this.commonApiService.getData(GlobalVariable.GET_ACTIVITY_LOG.replace('${companyId}', companyId) + '?targetUserName=' + clientId);
    this.commonApiService.getData(GlobalVariable.GET_ACTIVITY_LOG.replace('${companyId}', companyId) + '?targetUserName=' + clientId)
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.auditlog = data
          this.loader = false;
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors[0].value; }
          this.loader = false;
        }
      );

  }

}
