import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { Location } from '@angular/common';

@Component({
  selector: 'app-data-download',
  templateUrl: './data-download.component.html',
  styleUrls: ['./data-download.component.css']
})
export class DataDownloadComponent implements OnInit, OnDestroy {
  dateRequested: Date;
  deliveredOn: Date;
  fileSize = 0;
  downLoadUrl = '';
  routeData: any;
  companyId = '';
  deliveryKey = '';
  serverError: any;
  imageData: any;  
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService,
    private router: Router, private route: ActivatedRoute, private location: Location) {
  }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
      this.deliveryKey = params['deliveryKey'];
      if (this.companyId !== '' && this.deliveryKey !== '') {
        this.deliveryInfo();
      }
    });
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId);    
  }


  ngOnDestroy() {
    this.routeData.unsubscribe();
  }
  deliveryInfo() {
    this.commonApiService.getData(GlobalVariable.GET_DELIVERY_INFO.replace('${companyId}', this.companyId)
      .replace('${deliveryKey}', this.deliveryKey))
      .subscribe(
        data => {
          this.dateRequested = data.dateRequested;
          this.deliveredOn = data.deliveredOn;
          this.fileSize = data.fileSize;
          this.downLoadUrl = GlobalVariable.GET_DOWNLOAD_DELIVERY.replace('${companyId}', this.companyId).replace('${deliveryKey}', this.deliveryKey);
        },
        err => { this.serverError = "Something went wrong. Please try again."; }
      );
  }

  goBack() {
    this.location.back();
  }

}
