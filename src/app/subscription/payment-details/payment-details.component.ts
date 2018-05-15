import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GlobalStorage } from '../../global';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit, OnDestroy {
  createForm: FormGroup;
  closeResult: string;
  isChecked: boolean;
  plan: string;
  routeData: any;
  error = '';

  public pageTitle = 'Please enter your billing details.';
  constructor(public app: GlobalStorage, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder, location: Location, private modalService: NgbModal) {
    this.createForm = this.formBuilder.group({
      street: ['', Validators.required],
      cPCode: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      billingPhone: ['', Validators.required],
      cvrNumber: ['', Validators.required],
      paymentDetails1: ['', Validators.required],
      paymentDetails2: ['', Validators.required],
      paymentDetails3: ['', Validators.required],
      chkTerms: [false, Validators.pattern('true')]
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
  showPolicy(content, event) {
    if (event.target.checked) {
      this.modalService.open(content).result.then((result) => {
        this.createForm.controls['chkTerms'].setValue(result == 'Accept');
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
  }
  showTerms(content) {
    this.modalService.open(content).result.then((result) => {
      this.createForm.controls['chkTerms'].setValue(result === 'Accept');
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  confirmSubscription() {
    console.log(this.createForm.value);
    this.router.navigate(['/dashboard']);
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
