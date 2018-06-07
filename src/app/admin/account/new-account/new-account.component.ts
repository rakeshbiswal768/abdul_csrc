import { Component, OnInit, Input, OnDestroy, ChangeDetectorRef, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CommonApiService } from '../../../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../../../../app/global'
import { Message } from 'primeng/components/common/api';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit, OnDestroy, OnChanges {
  pageTitle: string = "Create a SafeProfile account";
  // pageTitle: string = "Create an account";
  // pageTitle = 'Create a new account for your organization';
  pageInformation: string = "First create your company account, then enter payment details in the final step.";
  titleCompanyInfo: string = "Company Info";
  titleyourInfo: string = "Your Info";
  userDataFormGroup: FormGroup;
  creditDataFormGroup: FormGroup;
  createForm: FormGroup;
  closeResult: string;
  isChecked: boolean;
  plan: string;
  planId: string;
  routeData: any;
  error = '';
  countries: any;
  phoneDisplayMessage = '+45';
  phoneCountries: any;
  phoneCountryCode = '';
  serverError = null;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isNext = true;
  level1Amount: Number;
  level2Amount: Number;
  companyId: string;
  isLinear: boolean = false;
  isStep1: boolean;
  isStep2: boolean;
  isStep3: boolean;

  constructor(public app: GlobalStorage, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private modalService: NgbModal, private cdRef: ChangeDetectorRef,
    private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      companyName: ['', Validators.required],
      websiteUrl: [''],
      phoneCountryCode: ['+45', Validators.required],
      companyPhone: ['', Validators.required]
    });

    this.userDataFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      email: ['', Validators.required],
      chkTerms: [false, Validators.required]
    });

    this.creditDataFormGroup = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required]

    });
  }

  onBackClick(stepper: MatStepper) {

    stepper.previous();

    this.isStep1 = false;
    this.isStep2 = false;
    this.isStep3 = false;

    if (stepper.selectedIndex === 0) {
      this.isStep1 = true;

    } else if (stepper.selectedIndex === 1) {
      this.isStep2 = true;

    } else if (stepper.selectedIndex === 2) {

      this.isStep3 = true;
    }
  }

  onNext(stepper: MatStepper) {

    stepper.next();

    this.isStep1 = false;
    this.isStep2 = false;
    this.isStep3 = false;

    if (stepper.selectedIndex === 0) {
      this.isStep1 = true;

    } else if (stepper.selectedIndex === 1) {
      this.isStep2 = true;

    } else if (stepper.selectedIndex === 2) {

      this.isStep3 = true;
    }

  }

  createAccount(stepper: MatStepper) {
    if (this.plan == "trial") {

      this.registerUser();

    } else {

      stepper.next();

      this.isStep1 = false;
      this.isStep2 = false;
      this.isStep3 = true;
    }
  }

  registerUser() {
    const body = {
      'companyName': this.createForm.value.companyName,
      'websiteUrl': this.createForm.value.websiteUrl,
      'phoneCountryCode': this.createForm.value.phoneCountryCode,
      'companyPhone': this.createForm.value.companyPhone,
      'firstName': this.userDataFormGroup.value.firstName,
      'lastName': this.userDataFormGroup.value.lastName,
      'jobTitle': this.userDataFormGroup.value.jobTitle,
      'email': this.userDataFormGroup.value.email
    };
    this.commonApiService.postData(GlobalVariable.REGISTER_COMPANY_INFO, body)
      .subscribe(
        data => {

          if (this.plan == "trial") {
            this.router.navigate(['trial/inst-sent/welcomeUser']);
          } else {

            this.companyId = data.id;

            this.sendCreditCardInfo();
          }

        },
        err => {
          if (err.status == 400) {
            this.serverError = err.error.errors;
          }
        }
      );
  }



  ngOnInit() {

    this.isStep1 = true;
    this.isStep2 = false;
    this.isStep3 = false;

    this.getPlanInfo();

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.commonApiService.getData(GlobalVariable.GET_COUNTRIES)
      .subscribe(
        countries => {
          this.countries = countries;
        },
        err => {
          if (err.status == 400) {
            this.serverError = err.error.errors;
          }
        }
      );

    this.routeData = this.route.params.subscribe(params => {
      this.plan = params['plan'];
      this.planId = params['planId'];
      if (this.plan != null) {
        this.userDataFormGroup.controls['chkTerms'].setValidators(null);
      }
    });

  }

  changephoneCountry(name, code) {
    this.phoneDisplayMessage = code;
    this.phoneCountryCode = code;
    this.createForm.controls['phoneCountryCode'].setValue(this.phoneCountryCode);
  }

  goForward(stepper: MatStepper) {
    stepper.next();
    this.isNext = false;
  }

  setBtn(stepper: MatStepper) {
    // stepper.next();
    this.isNext = stepper.selectedIndex === 0 ? true : false;
  }

  ngOnDestroy() {
    // this.routeData.unsubscribe();
  }

  ngOnChanges() {
  }


  cancelUser() {
    this.router.navigate(['login']);
  }

  showPolicy(content, event) {
    if (event.target.checked) {
      event.srcElement.blur();
      this.modalService.open(content).result.then((result) => {
        this.userDataFormGroup.controls['chkTerms'].setValue(result === 'Accept');
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    // this.cdRef.detectChanges();
  }

  showTerms(content, event) {
    event.srcElement.blur();
    this.modalService.open(content).result.then((result) => {
      this.userDataFormGroup.controls['chkTerms'].setValue(result === 'Accept');
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

  private getPlanInfo() {

    this.commonApiService.getData(GlobalVariable.GET_ALL_LICENSE_PLANS)
      .subscribe(
        data => {
          data.item3.forEach(element => {
            if (element.name === 'Level II') {
              this.level2Amount = element.amount;
            }
            else {
              this.level1Amount = element.amount;
            }

          });
        },
        err => {
          if (err.status == 400) {
            this.serverError = err.error.errors;
          }
        }
      );
  }

  sendCreditCardInfo() {

    const body = {
      "companyId": this.companyId,
      'planId': this.planId === 'level1' ? 'Level I' : 'Level II',
      "cardNumber": this.creditDataFormGroup.value.cardNumber,
      "cardName": "",
      "cardExpirationYear": this.creditDataFormGroup.value.expiration.toString().split('/')[1],
      "cardExpirationMonth": this.creditDataFormGroup.value.expiration.toString().split('/')[0],
      "cardCvc": this.creditDataFormGroup.value.cvv,
      "cardAddressCountry": "",
      "cardAddressLine1": "",
      "cardAddressLine2": "",
      "cardAddressCity": "",
      "cardAddressZip": "",
      "stripeBillingEmail": ""

    };
    this.commonApiService.postData(GlobalVariable.POST_LICENSE_PLAN, body)
      .subscribe(
        data => {
          // this.router.navigate(['settings']);
          this.router.navigate(['trial/inst-sent/welcomeUser']);
        },
        err => {
          if (err.status == 400) {
            this.serverError = err.error.errors;
          }
        }
      );
  }

}
