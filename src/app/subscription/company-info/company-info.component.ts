import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../../app/global';

@Component({
  selector: 'app-company-info',
  templateUrl: './company-info.component.html',
  styleUrls: ['./company-info.component.css']
})
export class CompanyInfoComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  plan: string;
  routeData: any;
  companyId: any;
  error = '';

  public pageTitle: string = "Please complete your company info";
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, location: Location, private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      companyWebsite: [''],
      companyPhone: ['', Validators.required],
      cvrNumber: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('companyId');
    this.getCompanyInfo();

    this.routeData = this.route.params.subscribe(params => {
      this.plan = params['plan'];
    });
  }

  getCompanyInfo() {
    if (this.companyId == null && this.companyId == '') return;
    this.commonApiService.getData(GlobalVariable.COMPANY_INFO.replace('${companyId}', this.companyId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}

          this.createForm.controls['companyName'].setValue(data.companyName);
          this.createForm.controls['companyWebsite'].setValue(data.websiteUrl);
          this.createForm.controls['companyPhone'].setValue(data.companyPhone);
          this.createForm.controls['cvrNumber'].setValue(data.cvrVat);
        },
        err => console.log(err),
        () => console.log('done')
      );
  }
  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  companyInfo() {
    //console.log(this.createForm.value);
    const body = {
      'licenseModelType': this.plan,
      'companyName': this.createForm.value.companyName,
      'companyPhone': this.createForm.value.companyPhone,
      'websiteUrl': this.createForm.value.companyWebsite
    }
    // this.commonApiService.postData(GlobalVariable.REGISTER_COMPANY, body)
    //   .subscribe(
    //   data => {
    //     // this.router.navigate(['dashboard']);
    //   },
    //   err => {
    //     console.log(err);
    //     //this.errorMessage = err;
    //     //this.successMessage = null;
    //   },
    //   () => console.log('done')
    //   );
    if (this.plan != null) {
      this.router.navigate(['registered/payment-details', this.plan]);
    }
    else {
      this.router.navigate(['registered/payment-details']);
    }


  }

}
