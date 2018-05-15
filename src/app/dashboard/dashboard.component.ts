import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { Router } from '@angular/router';
import { CommonApiService } from '../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../global'
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pageTitle = 'Dashboard';
  isAdmin: boolean = true;
  showNotification = false;
  showRolealert = false;
  userRoleType: string = null;
  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService, private commonApiService: CommonApiService, private router: Router, private loader: NgxSmartLoaderService) {
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
    this.loader.stop('myLoader');
    if (localStorage.getItem(sessionStorage.getItem('assignUserId') + 'showNotification')) {
      const diff = Math.abs((new Date()).getTime() - new Date(localStorage.getItem(sessionStorage.getItem('assignUserId') + 'showNotification')).getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      this.showNotification = diffDays > 7;
    } else {
      this.showNotification = true;
    }
    if (localStorage.getItem(sessionStorage.getItem('assignUserId') + 'showRolealert')) {
      const diff = Math.abs((new Date()).getTime() - new Date(localStorage.getItem(sessionStorage.getItem('assignUserId') + 'showRolealert')).getTime());
      const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
      this.showRolealert = diffDays > 7;
    } else {
      this.showRolealert = true;
    }
  }

  dontShow() {
    this.showRolealert = true;
    localStorage.setItem(sessionStorage.getItem('assignUserId') + 'showRolealert', (new Date()).toDateString());
  }

  closeNotification() {
    this.showNotification = false;
    localStorage.setItem(sessionStorage.getItem('assignUserId') + 'showNotification', (new Date()).toDateString());
  }
}
