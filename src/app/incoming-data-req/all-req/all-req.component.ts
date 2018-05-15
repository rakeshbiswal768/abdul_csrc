import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
// import { FilterReqPipe } from '../filter-req.pipe';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-all-req',
  templateUrl: './all-req.component.html',
  styleUrls: ['./all-req.component.css']
})
export class AllReqComponent implements OnInit {
  val: string;
  allReq = [];
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
  userRoleType: string = null;
  isAdmin: boolean = true;
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private _router: Router, private loader: NgxSmartLoaderService) {
    this.router = _router;
  }

  ngOnInit() {
    this.loader.start('myLoader');
    if (this.router.url === '/incoming-data/New') {
      this.paramVal = 'New';
    } else if (this.router.url === '/incoming-data/Inprocess') {
      this.paramVal = 'Inprocess';
    } else {
      this.paramVal = 'showall';
    }
    this.getAllReqData(this.paramVal);
    // this.reqStatus = 'showall';
    this.loader.stop('myLoader');
  }

  goToReqest(requestId, requestStatus, dueInDays, user, dueDate) {
    this.router.navigate(['/users/user-profile-req/' + requestId + '/' + requestStatus + '/'
      + dueInDays.toString() + '/' + user + '/' + dueDate]);
    sessionStorage.setItem('refer', '/incoming-data');
  }

  //  filterTable(filterText) {
  //    this.reqStatus = filterText;
  // this.getAllReqData();
  //  }

  searchUser(rUser) {
    if (rUser) {
      this.searchVal = rUser;
      this.filterFlag = '';
      this.getAllReqData(this.searchVal);
    }
  }

  filterData(param) {
    this.searchVal = '';
    this.searchValue = null;
    this.paramVal = param;
    this.getAllReqData(this.paramVal);
  }

  cancelFilter() {
    this.paramVal = 'showall';
    this.getAllReqData(this.paramVal);
  }
  getAllReqData(arg1) {
    this.loader.start('myLoader');
    const companyId = sessionStorage.getItem('companyId');
    if (this.searchVal) {
      this.commonApiService.getData(GlobalVariable.GET_ALL_REQUESTS.replace('${companyId}', companyId) + '?columnNameToSort=' + this.columnNameToSort + '&sortDirection=' + this.sortDirection + '&search=' + this.searchVal + '&count=' + this.recCount)
        .subscribe(
          data => {
            this.allReq = data;
            this.loader.stop('myLoader');
          },
          err => {
            this.loader.stop('myLoader');
            console.log(err)
          });
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
          this.allReq[0] = "No data found for your filter";
          this.filterFlag = '';
        } else {
          this.commonApiService.getData(GlobalVariable.GET_ALL_REQUESTS.replace('${companyId}', companyId) + '?columnNameToSort=' + this.columnNameToSort + '&sortDirection=' + this.sortDirection + '&search=' + this.searchVal + '&count=' + this.recCount + '&filter=' + arg1)
            .subscribe(
              data => {
                this.allReq = data;
                this.loader.stop('myLoader');
              },
              err => {
                this.loader.stop('myLoader');
                console.log(err)
              });
        }
      }
      else {
        this.filterFlag = 'allfilter';
        this.commonApiService.getData(GlobalVariable.GET_ALL_REQUESTS.replace('${companyId}', companyId) + '?count=' + this.recCount)
          .subscribe(
            data => {
              this.allReq = data;
              this.loader.stop('myLoader');
            },
            err => {
              this.loader.stop('myLoader');
              console.log(err)
            });
      }
    }
  }
}
