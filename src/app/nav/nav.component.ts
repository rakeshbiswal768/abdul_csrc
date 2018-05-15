import { Component, OnInit } from '@angular/core';
import { GlobalVariable, GlobalStorage } from '../../app/global';
import { CommonApiService } from '../../app/api/common-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  profileName = [];
  isAdmin = true;
  companyId = '';
  logo = '';
  dateFormat = '';
  btnFormat = '';
  aFormat = '';
  imageData: any;
  userRole: any;
  displayRole: string = null;
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private router: Router) { }
  getCompanyLogo() {
    this.companyId = sessionStorage.getItem('companyId');
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId);
    if (this.imageData === null || this.imageData === undefined) {
      this.imageData = "/assets/images/idlink_id_logo.svg";
    }
  }
  ngOnInit() {
    if (!sessionStorage.getItem('activeRole')) {
      let userRoles = JSON.parse(sessionStorage.getItem('roleType'));
      if (userRoles.findIndex(el => el.toLowerCase() === 'owner') !== -1) {
        this.isAdmin = false;
        this.displayRole = 'Owner';
        this.router.navigate(['settings']);
      } else if (userRoles.findIndex(el => el.toLowerCase() === 'admin') !== -1) {
        this.isAdmin = false;
        this.displayRole = 'Admin';
        this.router.navigate(['settings']);
      } else if (userRoles.findIndex(el => el.toLowerCase() === 'systemuser') !== -1) {
        this.isAdmin = true;
        this.displayRole = 'SystemUser';
        this.router.navigate(['dashboard']);
      }
      else {
        this.isAdmin = true;
        this.displayRole = 'SystemManager';
        this.router.navigate(['dashboard']);
      }
      this.userRole = JSON.parse(sessionStorage.getItem('roleType'));
      sessionStorage.setItem('activeRole', this.displayRole);
    } else {
      this.displayRole = sessionStorage.getItem('activeRole');
      if (this.displayRole.toLowerCase() === 'owner') {
        this.isAdmin = false;
        this.displayRole = 'Owner';
      } else if (this.displayRole.toLowerCase() === 'admin') {
        this.isAdmin = false;
        this.displayRole = 'Admin';
      } else if (this.displayRole.toLowerCase() === 'systemuser') {
        this.isAdmin = true;
        this.displayRole = 'SystemUser';
      }
      else {
        this.isAdmin = true;
        this.displayRole = 'SystemManager';
      }
      this.userRole = JSON.parse(sessionStorage.getItem('roleType'));
    }
    this.getCompanyLogo();
    this.profileName = sessionStorage.getItem('profileName').split(' ');
    // this.profileName = sessionStorage.getItem('profileName');
    // this.logo = sessionStorage.getItem('logo');
    // this.dateFormat = sessionStorage.getItem('dateFormat');
    // this.btnFormat = sessionStorage.getItem('buttonColor');
    // this.aFormat = sessionStorage.getItem('accentColor');
  }
  changeRole(arg) {
    this.displayRole = arg;
    sessionStorage.setItem('activeRole', this.displayRole);
    if (this.displayRole.toLowerCase() === 'admin') {
      //this.router.navigate(['settings']);
      window.location.href = "/settings";
      //this.isAdmin = false;
    } else if (this.displayRole.toLowerCase() === 'systemuser') {
      //this.router.navigate(['dashboard']);
      window.location.href = "/dashboard";
      //this.isAdmin = true;
    } else if (this.displayRole.toLowerCase() === 'owner') {
      //this.router.navigate(['settings']);
      window.location.href = "/settings";
      //this.isAdmin = false;
    } else {
      //this.router.navigate(['dashboard']);
      window.location.href = "/dashboard";
      //this.isAdmin = true;
    }
  }

}
