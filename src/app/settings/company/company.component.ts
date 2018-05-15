
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { GlobalVariable, GlobalStorage } from '../../../app/global';
import { CommonApiService } from '../../../app/api/common-api.service';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {
  createForm: FormGroup;
  companyId: any;
  successMessage: string;
  errorMessage: string;
  displayMessage = null;
  countries: any;
  countryCode = '';
  phoneDisplayMessage = null;
  phoneCountries: any;
  phoneCountryCode = 'Select';
  licenseModelType: '';

  public pageTitle = 'Company information';
  constructor(public app: GlobalStorage, private formBuilder: FormBuilder, private commonApiService: CommonApiService, private loader: NgxSmartLoaderService) {
    this.createForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      websiteUrl: [''],
      companyPhone: ['', Validators.required],
      phoneCountryCode: ['', Validators.required],
      address: ['', Validators.required],
      countryCode: ['', Validators.required],
      // countries:[''],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      cvrVat: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loader.start('myLoader');
    this.commonApiService.getData(GlobalVariable.GET_COUNTRIES)
      .subscribe(
        countries => {
          this.countries = countries;
          const companyId = sessionStorage.getItem('companyId');
          this.loader.stop('myLoader');
          this.getCompanyInfo(companyId);
        },
        err => { console.log(err); this.loader.stop('myLoader'); }
      );
      this.loader.stop('myLoader');
  }

  getCompanyInfo(id) {
    this.loader.start('myLoader');
    this.companyId = id;
    const companyId = this.companyId;
    this.commonApiService.getData(GlobalVariable.COMPANY_INFO.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.countries.forEach(element => {
            if (element.name === data.countryCode3) {
              this.displayMessage = element.name;
            }
            if (element.dial_Code === data.phoneCountryCode) {
              this.phoneDisplayMessage = element.dial_Code;
            }
          });
          if (!this.displayMessage) {
            this.displayMessage = "Select";
          }
          if (!this.phoneDisplayMessage) {
            this.phoneDisplayMessage = "Select";
          }
          this.createForm.controls['companyName'].setValue(data.companyName);
          this.createForm.controls['websiteUrl'].setValue(data.websiteUrl);
          this.createForm.controls['address'].setValue(data.address ? data.address.address : '');
          this.createForm.controls['city'].setValue(data.address ? data.address.city : '');
          this.createForm.controls['postalCode'].setValue(data.address ? data.address.postalCode : '');
          this.createForm.controls['countryCode'].setValue(data.countryCode3 ? data.countryCode3 : null);
          this.createForm.controls['cvrVat'].setValue(data.cvrVat);
          this.createForm.controls['phoneCountryCode'].setValue(data.phoneCountryCode ? data.phoneCountryCode : null);
          this.createForm.controls['companyPhone'].setValue(data.companyPhone);
          this.licenseModelType = data.licenseModelType ? data.licenseModelType : 'Trial';
          this.loader.stop('myLoader');
        },
        err => { console.log(err); this.loader.stop('myLoader'); }
      );
  }
  changeCompany(name, code) {
    this.displayMessage = name;
    this.countryCode = name;
    this.createForm.controls['countryCode'].setValue(name);
  }
  changephoneCountry(name, code) {
    this.phoneDisplayMessage = code;
    this.phoneCountryCode = code;
    this.createForm.controls['phoneCountryCode'].setValue(this.phoneCountryCode);
  }
  saveChanges() {
    const body = {
      'countryCode3': this.createForm.value.countryCode,
      'cvrVat': this.createForm.value.cvrVat,
      'address':
        {
          'address': this.createForm.value.address,
          'city': this.createForm.value.city,
          'postalCode': this.createForm.value.postalCode
        },
      'licenseModelType': this.licenseModelType,
      'companyName': this.createForm.value.companyName,
      'phoneCountryCode': this.createForm.value.phoneCountryCode,
      'companyPhone': this.createForm.value.companyPhone,
      'websiteUrl': this.createForm.value.websiteUrl
    }
    this.loader.start('myLoader');
    this.commonApiService.postData(GlobalVariable.UPDATE_COMPANY_INFO.replace('${companyId}', this.companyId), body)
      .subscribe(
        data => {
          this.successMessage = 'Company information is updated';
          this.loader.stop('myLoader');
        },
        err => {
          this.errorMessage = 'Error updating company information';
          this.loader.stop('myLoader');
        }
      );

  }

}

