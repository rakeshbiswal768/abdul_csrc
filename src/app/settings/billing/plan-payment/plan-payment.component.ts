import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../../app/global';

@Component({
  selector: 'app-plan-payment',
  templateUrl: './plan-payment.component.html',
  styleUrls: ['./plan-payment.component.css']
})
export class PlanPaymentComponent implements OnInit {
  display = false;
  createForm: FormGroup;
  serverError = null;
  routeData: any;
  planId = '';
  displayConfirmation = false;
  isUpgrade = false;
  isConfirmClicked = false;
  level1Amount: Number;
  level2Amount: Number;

  constructor(public app: GlobalStorage, private router: Router, private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      cardNumber: ['', Validators.required],
      expiration: ['', Validators.required],
      cvv: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getPlanInfo();
    this.display = true;
    // document.getElementsByTagName('body')[0].classList.add("home");
    document.body.className += ' ' + 'paymentDialog';
    this.routeData = this.route.params.subscribe(params => {
      this.planId = params['planId'];
      this.isUpgrade = params['isUpgrade'] === 'upgrade' ? true : false;
    });
  }

  getPlanInfo() {
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
          console.log(err)
        });
  }

  sendCreditCardInfo() {
    this.isConfirmClicked = true;
    const body = {
      'companyId': sessionStorage.getItem('companyId'),
      'planId': this.planId === 'level1' ? 'Level I' : 'Level II',
      'cardNumber': this.createForm.value.cardNumber,
      'cardName': '',
      'cardExpirationYear': this.createForm.value.expiration.toString().split('/')[1],
      'cardExpirationMonth': this.createForm.value.expiration.toString().split('/')[0],
      'cardCvc': this.createForm.value.cvv,
      'cardAddressCountry': '',
      'cardAddressLine1': '',
      'cardAddressLine2': '',
      'cardAddressCity': '',
      'cardAddressZip': '',
      'stripeBillingEmail': ''

    };
    const apiCall = this.isUpgrade ? GlobalVariable.POST_LICENSE_PLAN_UPGRADE : GlobalVariable.POST_LICENSE_PLAN;
    this.commonApiService.postData(apiCall, body)
      .subscribe(
        data => {
          this.display = false;
          this.displayConfirmation = true;
        },
        err => {
          if (err.status === 400) {
            this.serverError = err.error.errors;
          }
        }
      );


  }
  onHideConf() {
    this.router.navigate(['/settings']);
  }

  onHide() {
    if (!this.isConfirmClicked) {
      this.router.navigate(['/settings']);
    }
  }

}
