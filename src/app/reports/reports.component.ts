import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { CommonApiService } from '../api/common-api.service'
import { GlobalVariable } from '../global'

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  pageTitle = 'Reporting & Auditing';
  constructor(private authenticationService: AuthenticationService, private commonApiService: CommonApiService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
  }

}
