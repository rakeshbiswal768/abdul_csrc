import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service'
import { GlobalVariable } from '../../global'
import { Router } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
import * as _ from "lodash";


@Component({
  selector: 'app-current-request',
  templateUrl: './current-request.component.html',
  styleUrls: ['./current-request.component.css']
})
export class CurrentRequestComponent implements OnInit {
  currentRequests: any;
  sortOrder: boolean=true;
  serverError: string = null;
  constructor(private commonApiService: CommonApiService, private router: Router, private authenticationService: AuthenticationService, private loader: NgxSmartLoaderService) { }

  ngOnInit() {
    this.getInProgress();
  }

  

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.loader.start('myLoader');
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/dashboard');
  }

  onSort(){
    let order= this.sortOrder?'asc':'dsc';
    _.orderBy(this.currentRequests, ['received'],[order])
  }
  getInProgress() 
  {
    this.loader.start('myLoader');
    const companyId = sessionStorage.getItem('companyId');
    //this.currentRequests = this.commonApiService.getData(GlobalVariable.IN_PROGRESS
    //  .replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT);
    this.commonApiService.getData(GlobalVariable.RECENT_ACTIVITY.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT + '&sortDirection=DESC')
      .subscribe(data => {
       
        data= _.orderBy(data,function(e) { return new Date(e.recentActivity.date)},['desc']);
        data = _.uniqBy(data, "requestId");
        this.currentRequests = _.orderBy(data,function(e) {return new Date(e.requestCreatedDate)},['desc'])
        this.loader.stop('myLoader');
      },
        err => {
          if (err) { this.serverError = err.error.errors; this.loader.stop('myLoader'); }
        }
      );
  }
}