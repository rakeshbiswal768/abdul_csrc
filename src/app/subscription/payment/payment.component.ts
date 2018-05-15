import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  plan: string;
  routeData: any;
  error = '';

  public pageTitle = 'Choose the license model that suits your organization.';
  constructor(private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, location: Location) {
    this.createForm = this.formBuilder.group({
      paymentDetails1: ['', Validators.required],
      paymentDetails2: ['', Validators.required],
      paymentDetails3: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.plan = params['plan'];
      // this.createForm.controls['chkTerms'].setValidators(null);
    });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }


  confirmSubscription() {
    console.log(this.createForm.value);
    // this.router.navigate(['/dashboard']);
    // var header = new Headers();
    // header.append('Content-Type','application/json');
    // let body =   {
    //     "street": this.createForm.value.street,
    //     "cPCode": this.createForm.value.cPCode,
    //     "companyPhone": this.createForm.value.companyPhone,
    //     "firstName": this.createForm.value.firstName,
    //     "lastName": this.createForm.value.lastName,
    //     "jobTitle": this.createForm.value.jobTitle,
    //     "email": this.createForm.value.email
    // };
    // this.http.post('http://localhost:3000/paymnent', JSON.stringify(body),{headers:header})
    // .map(res=>res.json())
    // .subscribe(
    //   data=>console.log(data),
    //   err=>console.log(err),
    //   ()=>console.log('done')
    // );
  }
  cancelUser() {
    this.router.navigate(['login']);
  }
}
