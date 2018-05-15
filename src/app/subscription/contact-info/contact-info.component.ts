import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../../app/global';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  plan: string;
  routeData: any;
  companyId: any;
  error = '';

  public pageTitle: string = "Please complete your contact information";
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder, location: Location, private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.required],
      companyPhone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getContactInfo();
    this.routeData = this.route.params.subscribe(params => {
      this.plan = params['plan'];
      // console.log(this.plan);
    });
  }

  getContactInfo() {
    this.companyId = sessionStorage.getItem('companyId');
    if (this.companyId == null && this.companyId == '') return;
    this.commonApiService.getData(GlobalVariable.GET_CONTACT_INFO.replace('${companyId}', this.companyId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.createForm.controls['firstName'].setValue(data.firstName);
          this.createForm.controls['lastName'].setValue(data.lastName);
          this.createForm.controls['jobTitle'].setValue(data.jobTitle);
          this.createForm.controls['companyPhone'].setValue(data.companyPhone);
          this.createForm.controls['email'].setValue(data.email);
        },
        err => console.log(err),
        () => console.log('done')
      );
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  contactInfo() {
    // console.log(this.createForm.value);

    const body = {
      'companyPhone': this.createForm.value.companyPhone,
      'firstName': this.createForm.value.firstName,
      'lastName': this.createForm.value.lastName,
      'jobTitle': this.createForm.value.jobTitle,
      'email': this.createForm.value.email
    }
    this.commonApiService.postData(GlobalVariable.REGISTER_CONTACT_INFO.replace('${companyId}', this.companyId), body)
      .subscribe(
        data => {
          if (this.plan != null) {
            this.router.navigate(['registered/company-info', this.plan]);
          }
          else {
            this.router.navigate(['trial/register']);
          }
          //this.successMessage = 'Contact information is updated';
          //this.errorMessage = null;
          // this.router.navigate(['trial/inst-sent']);
        },
        err => {
          console.log(err);
          //this.errorMessage = err;
          //this.successMessage = null;
        }
      );



  }

}
