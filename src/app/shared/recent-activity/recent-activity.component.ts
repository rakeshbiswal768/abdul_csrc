import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { Router } from '@angular/router';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.css']
})
export class RecentActivityComponent implements OnInit {
  recentActivity: any;
  serverError: string = null;
  constructor(private commonApiService: CommonApiService, private router: Router, private loader: NgxSmartLoaderService) { }

  ngOnInit() {
    this.getRecentActivity();
  }

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/dashboard');
  }

  getRecentActivity() {
    this.loader.start('myLoader');
    const companyId = sessionStorage.getItem('companyId');
    //this.recentActivity = this.commonApiService.getData(GlobalVariable.RECENT_ACTIVITY.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT + '&sortDirection=DESC');
    this.commonApiService.getData(GlobalVariable.RECENT_ACTIVITY.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT + '&sortDirection=DESC')
      .subscribe(data => {
        this.recentActivity = data;
        this.loader.stop('myLoader');
      },
        err => {
          if (err) { this.serverError = err.error.errors; this.loader.stop('myLoader'); }
        }
      );

  }
}
