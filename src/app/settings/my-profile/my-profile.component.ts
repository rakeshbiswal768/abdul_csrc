
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../../../app/global'
import { debug } from 'util';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  createForm: FormGroup;
  companyId: any;
  successMessage: string;
  errorMessage: string;
  userRole: any;
  countries: any;
  phoneDisplayMessage = '+45';
  phoneCountries: any;
  phoneCountryCode = '';

  public pageTitle = 'Your account information';
  constructor(public app: GlobalStorage, private formBuilder: FormBuilder, private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.required],
      phoneCountryCode: ['+45', Validators.required],
      companyPhone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.commonApiService.getData(GlobalVariable.GET_COUNTRIES)
      .subscribe(
        countries => {
          this.countries = countries;
        },
        err => console.log(err)
      );
    this.getContactInfo();
    this.companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_CURRENT_USER.replace('${companyId}', this.companyId))
      .subscribe(
        data => {
          let roleList = [];
          data.roles.forEach(element => {
            roleList.push(element.roleType);
          });
          this.userRole = JSON.parse(JSON.stringify(roleList));
        },
        err => console.log(err)
      );
  }

  getContactInfo() {
    this.companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_CONTACT_INFO.replace('${companyId}', this.companyId))
      .subscribe(
        data => {
          this.countries.forEach(element => {
            if (element.dial_Code === data.phoneCountryCode) {
              this.phoneDisplayMessage = element.dial_Code;
            }
          });
          if (!this.phoneDisplayMessage) {
            this.phoneDisplayMessage = "+45";
          }
          this.createForm.controls['firstName'].setValue(data.firstName);
          this.createForm.controls['lastName'].setValue(data.lastName);
          this.createForm.controls['jobTitle'].setValue(data.jobTitle);
          this.createForm.controls['phoneCountryCode'].setValue((data.dial_Code) ? data.dial_Code : '+45');
          this.createForm.controls['companyPhone'].setValue(data.companyPhone);
          this.createForm.controls['email'].setValue(data.email);
        },
        err => console.log(err)
      );
  }
  changephoneCountry(name, code) {
    this.phoneDisplayMessage = code;
    this.phoneCountryCode = code;
    this.createForm.controls['phoneCountryCode'].setValue(this.phoneCountryCode);
  }
  saveChanges() {
    const body = {
      'phoneCountryCode': this.createForm.value.phoneCountryCode,
      'companyPhone': this.createForm.value.companyPhone,
      'firstName': this.createForm.value.firstName,
      'lastName': this.createForm.value.lastName,
      'jobTitle': this.createForm.value.jobTitle,
      'email': this.createForm.value.email
    }
    const companyId = this.companyId;
    this.commonApiService.postData(GlobalVariable.REGISTER_CONTACT_INFO.replace('${companyId}', companyId), body)
      .subscribe(
        data => {
          this.successMessage = 'Contact information is updated';
          this.errorMessage = null;
        },
        err => {
          this.errorMessage = err;
          this.successMessage = null;
        }
      );

  }

}

