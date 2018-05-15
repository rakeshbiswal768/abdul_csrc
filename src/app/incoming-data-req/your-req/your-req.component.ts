import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
// import { FilterReqPipe } from '../filter-req.pipe';

@Component({
  selector: 'app-your-req',
  templateUrl: './your-req.component.html',
  styleUrls: ['./your-req.component.css']
})
export class YourReqComponent implements OnInit {
  val: string;
  yourReq = [];
  @Input()
  reqStatus = '';
  showRec: boolean = true;
  columnNameToSort: string = '';
  sortDirection: string = 'Desc';
  recCount: number = 100;
  paramVal: string = 'showall';
  searchVal: string = '';
  filterFlag: string = 'allfilter';
  dateFormat = '';
  router: any = '';
  searchValue: string = null;
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private _router: Router) {
    this.router = _router;
  }

  ngOnInit() {
    this.reqStatus = this.reqStatus ? this.reqStatus : '';
    this.getYourApproveReqData(this.paramVal);
  }

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/incoming-data');
  }
  // filterTable(filterText) {
  //   this.reqStatus = filterText;
  // }
  // onKey(event) {
  //   if (event.keyCode == 13) {
  //     this.searchVal = event.target.value;
  //     this.searchVal = this.searchVal.replace(' ', '');
  //     this.getYourApproveReqData(this.searchVal);
  //   }
  // }

  searchUser(rUser) {
    if (rUser) {
      this.searchVal = rUser;
      this.filterFlag = '';
      this.getYourApproveReqData(this.searchVal);
    }
  }

  filterData(param) {
    this.searchVal = '';
    this.searchValue = null;
    this.paramVal = param;
    this.getYourApproveReqData(this.paramVal);
  }

  cancelFilter() {
    this.paramVal = 'showall';
    this.getYourApproveReqData(this.paramVal);
  }

  getYourApproveReqData(arg1) {
    const companyId = sessionStorage.getItem('companyId');
    if (this.searchVal) {
      this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId) + '?columnNameToSort=' + this.columnNameToSort + '&sortDirection=' + this.sortDirection + '&search=' + this.searchVal + '&count=' + this.recCount)
        .subscribe(
          data => {
            this.yourReq = data;
          },
          err => console.log(err));
    } else {
      if (arg1 != 'showall') {
        if (arg1 === 'InProgress') {
          arg1 = 'InProgress&filter=PendingApproval';
          this.filterFlag = 'InProgress';
        } else if (arg1 === 'Inprocess') {
          arg1 = 'InProgress&filter=Incomplete&filter=PendingApproval';
          this.filterFlag = 'processfilter';
        } else if (arg1 === 'Problem') {
          arg1 = 'Cancelled&filter=Incomplete&filter=Rejected';
          this.filterFlag = 'problem';
        } else if (arg1 === 'Completed') {
          arg1 = 'Approved&filter=DownloadedByConsumer&filter=ReceivedByConsumer&filter=Sent';
          this.filterFlag = 'success';
        } else if (arg1 === 'New') {
          arg1 = 'New';
          this.filterFlag = 'newfilter';
        }
        else if (arg1 === 'PendingApproval' || arg1 === 'Cancelled' || arg1 === 'Incomplete' || arg1 === 'Rejected' || arg1 === 'Approved' || arg1 === 'DownloadedByConsumer' || arg1 === 'ReceivedByConsumer' || arg1 === 'Sent' || arg1 === 'InProgress' || arg1 === 'New') {
          arg1 = arg1;
        } else {
          this.showRec = false;
        }
        if (this.showRec === false) {
          this.yourReq[0] = "No data found for your filter";
          this.filterFlag = '';
        } else {
          this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId) + '?columnNameToSort=' + this.columnNameToSort + '&sortDirection=' + this.sortDirection + '&search=' + this.searchVal + '&count=' + this.recCount + '&filter=' + arg1)
            // this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId) + '?columnNameToSort=user&sortDirection=DESC&Filter=' + arg1 + '&count=100')
            .subscribe(
              data => {
                this.yourReq = data;
              },
              err => console.log(err));
        }
      }
      else {
        //this.paramVal = 'showall';
        this.filterFlag = 'allfilter';
        this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId) + '?count=' + this.recCount)
          .subscribe(
            data => {
              this.yourReq = data;
            },
            err => console.log(err));

      }

      // this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId) + '?count=100')
      //   .subscribe(
      //   data => {
      //     this.yourReq = data;
      //   },
      //   err => console.log(err),
      //   () => console.log('done')
      //   );
    }
  }
}
