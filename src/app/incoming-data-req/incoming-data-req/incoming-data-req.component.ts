import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-incoming-data-req',
  templateUrl: './incoming-data-req.component.html',
  styleUrls: ['./incoming-data-req.component.css']
})
export class IncomingDataReqComponent implements OnInit, OnDestroy {
  routeData: any;
  reqStatus = 'all';
  toApproveCount = 0;
  yourReqCount = 0;
  activeIdName = 'allReqs';
  userRoleType: string = null;
  isAdmin: boolean = true;
  constructor(private authenticationService: AuthenticationService, private commonApiService: CommonApiService, private router: Router,
    private route: ActivatedRoute, private loader: NgxSmartLoaderService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
    this.loader.start('myLoader');
    this.userRoleType = sessionStorage.getItem('activeRole').toLowerCase();
    if (this.userRoleType.toLowerCase() === 'owner' || this.userRoleType.toLowerCase() === 'admin') {
      this.router.navigate(['settings']);
    } else {
      this.isAdmin = false;
    }
    this.routeData = this.route.params.subscribe(params => {
      this.reqStatus = params['reqStatus'];
    });
    this.activeIdName = this.reqStatus === 'pendingapproval' ? 'toAppReqs' : 'allReqs';
    this.reqStatus = this.reqStatus ? this.reqStatus : 'showall';
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.TO_APPROVE.replace('${companyId}', companyId))
      .subscribe(result => {
        this.toApproveCount = result.length;
      });
    this.commonApiService.getData(GlobalVariable.MY_REQUESTS.replace('${companyId}', companyId))
      .subscribe(result => {
        this.yourReqCount = result.length;
      });
    this.loader.stop('myLoader');
  }

  setReqStatus() {
    this.reqStatus = 'showall';
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }
}
