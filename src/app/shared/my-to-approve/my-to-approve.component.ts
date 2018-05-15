import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { Router } from '@angular/router';
import { NgxSmartLoaderService } from 'ngx-smart-loader';
@Component({
  selector: 'app-my-to-approve',
  templateUrl: './my-to-approve.component.html',
  styleUrls: ['./my-to-approve.component.css']
})
export class MyToApproveComponent implements OnInit {
  mytoApprove: any;
  serverError: string = null;
  constructor(private commonApiService: CommonApiService, private router: Router, private loader: NgxSmartLoaderService) { }

  ngOnInit() {
    this.getmytoApprove();
  }

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/dashboard');
  }
  getmytoApprove() {
    this.loader.start('myLoader');
    const companyId = sessionStorage.getItem('companyId');
    //    this.mytoApprove = this.commonApiService.getData(GlobalVariable.TO_APPROVE.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT);
    this.commonApiService.getData(GlobalVariable.TO_APPROVE.replace('${companyId}', companyId) + '?count=' + GlobalVariable.COUNT)
      .subscribe(data => {
        this.mytoApprove = data;
        this.loader.stop('myLoader');
      },
        err => {
          if (err) { this.serverError = err.error.errors; this.loader.stop('myLoader'); }
        }
      );
  }
}
