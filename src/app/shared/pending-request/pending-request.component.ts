import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { Router } from '@angular/router';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.css']
})
export class PendingRequestComponent implements OnInit {
  pendingRequests: any;
  serverError: string = null;
  constructor(private commonApiService: CommonApiService, private router: Router, private loader: NgxSmartLoaderService) { }

  ngOnInit() {
    this.getPendingRequests();
  }

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/dashboard');
  }

  getPendingRequests() {
    this.loader.start('myLoader');
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_NEW_REQUESTS.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT)
      .subscribe(data => {
        this.pendingRequests = data;
        this.loader.stop('myLoader');
      },
        err => {
          if (err) { this.serverError = err.error.errors; this.loader.stop('myLoader'); }
        }
      );
    //this.pendingRequests = this.commonApiService.getData(GlobalVariable.GET_NEW_REQUESTS
    //.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT);
    //this.loader.stop('myLoader');
  }
}
