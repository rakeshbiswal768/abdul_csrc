import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { InputSwitchModule } from 'primeng/primeng';
import { ConsumerService } from '../consumer.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-verify-request',
  templateUrl: './verify-request.component.html',
  styleUrls: ['./verify-request.component.css']
})
export class VerifyRequestComponent implements OnInit {
  loading = false;
  createForm: FormGroup;
  isReqSent = false;
  successMessage: string;
  errorMessage: string;
  routeData: any;
  companyId: string = '';
  imageData: any;
  verified: boolean = false;
  emailVerificationModel: any;
  emailVerificationBox: boolean = false;
  emailVerified: boolean = false;
  phoneVerificationModel: any;
  phoneVerificationBox: boolean = false;
  phoneVerified: boolean = false;
  countries: any;
  countryCode = '+45';
  selectedCountry = '+45';
  serverError: any;

  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private formBuilder: FormBuilder,
    private router: Router, private route: ActivatedRoute, public consumerService: ConsumerService, private location: Location) {
    this.routeData = this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
    })
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId);
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      customerId: [''],
      emailId: ['', Validators.required],
      phoneCountryCode: ['+45', Validators.required],
      phoneNumber: [''],
      emailverificationCode: [''],
      phoneverificationCode: ['']
    });
  }

  ngOnInit() {
    this.commonApiService.getData(GlobalVariable.GET_COUNTRIES)
      .subscribe(
        countries => {
          this.countries = countries;
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors; }
        }
      );
  }

  changeCountry(name, code) {
    this.selectedCountry = name;
    this.countryCode = code;
  }

  emailValidator(email: string): boolean {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!EMAIL_REGEXP.test(email)) {
      this.emailVerificationBox = false;
      return false;
    }
    this.emailVerificationBox = true;
    return true;
  }

  phoneValidator(phone: string): boolean {
    if (phone) {
      this.phoneVerificationBox = true;
      if (phone.length == 10) {
        return true;
      } else {
        return false;
      }
    }
    else {
      this.phoneVerificationBox = false;
      return true;
    }
  }

  goBack() {
    this.location.back();
  }

  sendCodebyEmail() {
    const emailbody = {
      'email': this.createForm.value.emailId,
      'name': this.createForm.value.firstName + ' ' + this.createForm.value.lastName
    };
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.postData(GlobalVariable.POST_CR_REQUESTVERIFICATIONFOREMAIL.replace('${companyId}', companyId), emailbody)
      .subscribe(
        data => {
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors; }
        }
      );
  }

  sendCodebyPhone() {
    const phonebody = {
      'email': this.createForm.value.emailId,
      'phoneCountryCode': this.createForm.value.phoneCountryCode,
      'phone': this.createForm.value.phoneNumber
    };
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.postData(GlobalVariable.POST_CR_REQUESTVERIFICATIONFORPHONE.replace('${companyId}', companyId), phonebody)
      .subscribe(
        data => {
          this.serverError = null;
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors; }
        }
      );

  }

  cancelRequest() {
    this.location.back();
  }

  sendRequest() {
    const companyId = sessionStorage.getItem('companyId');
    const body = {
      'firstName': this.createForm.value.firstName,
      'lastName': this.createForm.value.lastName,
      'customerId': companyId,
      'email': this.createForm.value.emailId,
      'emailVerificationCode': this.createForm.value.emailverificationCode,
      'phoneCountryCode': this.createForm.value.phoneCountryCode,
      'phone': this.createForm.value.phoneNumber,
      'phoneVerificationCode': this.createForm.value.phoneverificationCode,
      'informationTypes': this.consumerService.categories.filter(item => item.isActive === true).map(c => c.name).join(',')
    };
    if (!this.consumerService.categories.filter(item => item.isActive === true).map(c => c.name).join(',')) {
      this.errorMessage = "There is some issue with Type Of Information. Please cancel or go back and start again to complete this request."
    } else {
      this.commonApiService.postData(GlobalVariable.POST_CR_MAKEREQUEST.replace('${companyId}', companyId), body)
        .subscribe(
          data => {
            this.serverError = null;
            this.verified = true;
            this.successMessage = 'Consumer Request Sent';
            this.errorMessage = null;
            this.emailVerificationBox = false;
            this.emailVerified = true;
            if (!this.createForm.value.phoneNumber) {
              this.phoneVerificationBox = false;
              this.phoneVerified = false;
            } else {
              this.phoneVerificationBox = false;
              this.phoneVerified = true;
            }
            setTimeout(() => {
              this.isReqSent = true;
           }, 2000);
          },
          err => {
            this.isReqSent = false;
            this.verified = false;
            this.successMessage = null;
            this.emailVerificationBox = true;
            this.emailVerified = false;
            if (!this.createForm.value.phoneNumber) {
              this.phoneVerificationBox = false;
              this.phoneVerified = false;
            } else {
              this.phoneVerificationBox = true;
              this.phoneVerified = false;
            }
            if (err.status == 400) {
              this.serverError = err.error.errors;
            }
          }
        );
    }
  }



  // downloadRequest() {
  //   this.isReqSent = true;
  //   this.successMessage = 'Consumer Request Sent';
  //   this.errorMessage = null;
  //   this.verified = false;
  //   this.emailVerificationBox = false;
  //   this.emailVerified = false;
  //   this.phoneVerificationBox = false;
  //   this.phoneVerified = false;
  //   this.serverError = null;
  // }
}

