import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { customFilterPipe } from '../../shared/customFilter';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  pageTitle = 'Clients';
  users: any;
  reqStatus = '';
  name = '';
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
    this.getUsers();
    this.loader.stop('myLoader');
  }

  getUsers() {
    const companyId = sessionStorage.getItem('companyId');
    this.users = this.commonApiService.getData(GlobalVariable.GET_CONSUMERS.replace('${companyId}', companyId));
  }

  // filterTable(filterText) {
  //   this.reqStatus = filterText;
  // }
  goToUser(name: string, dueDate: Date, requestId: string, reqStatus: string) {
    sessionStorage.setItem('requestId', requestId);
    const todaysDate = new Date();
    const oneDay = 1000 * 60 * 60 * 24;
    const dueInDays = Math.round((new Date(dueDate).getTime() -
      todaysDate.getTime()) / oneDay);
    this.router.navigate(['/users/user-profile-req', requestId, reqStatus, dueInDays, name, dueDate]);
    sessionStorage.setItem('refer', '/users/users');
  }

}



