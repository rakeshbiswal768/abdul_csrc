import { Component, OnInit } from '@angular/core';
import { CommonApiService } from '../../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../../../app/global'
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  companyId: string = '';
  urlLocation: any;
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private location: Location) {
    this.companyId = sessionStorage.getItem('companyId');
    this.urlLocation = window.location.origin;
  }

  ngOnInit() {
  }

  public logError(error: Error): void {

    console.group("Clipboard Error");
    console.error(error);
    console.groupEnd();

  }
  public logSuccess(value: string): void {

    console.group("Clipboard Success");
    console.groupEnd();

  }

}
