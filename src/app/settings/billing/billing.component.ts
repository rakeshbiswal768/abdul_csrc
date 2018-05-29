import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent implements OnInit {
  pageTitle = 'Billing and Invoicing details';
  cardHolderName = '';
  cardDetails = '';
  cardExpiryMonth = '';
  cardExpiryYear = '';
  planCurrency = '';
  planDetails = '';
  planCharges = '';
  planInterval = '';
  isTrail = false;
  // planCharges = '€439 / month + €3 / transfer';
  // billingHistory = [
  //   {
  //     'date': 'July 15, 2017',
  //     'plan': 'IDLink Professional',
  //     'amount': '€723.00'
  //   },
  //   {
  //     'date': 'July 15, 2017',
  //     'plan': 'IDLink Professional',
  //     'amount': '€624.00'
  //   }
  // ];
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getPlanDetails();
  }

  getPlanDetails() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_LICENSE_PLAN.replace('${companyid}', companyId))
      .subscribe(
        data => {
          if (data.item3 != null) {
            this.cardHolderName = data.item3.stripeCreditCardName;
            this.cardDetails = data.item3.stripeCreditCardLastFourDigits;
            this.cardExpiryMonth = data.item3.stripeCreditCardExpirationMonth;
            this.cardExpiryYear = data.item3.stripeCreditCardExpirationYear.slice(-2);
            this.planDetails = data.item3.stripeSubscriptionPlanName;
            this.planCurrency = data.item3.stripeSubscriptionCurrency;
            this.planCharges = data.item3.stripeSubscriptionAmount;
            this.planInterval = data.item3.stripeSubscriptionInterval;
          }
          this.isTrail = (this.planDetails === 'Level I' || this.planDetails === 'Level II');
          // this.auditlog = data;
          // this.auditlog.forEach(element => {
          //   this.filterAction.push(element.activityType);
          // })
          // let set = new Set(this.filterAction);
          // set.forEach(ele => {
          //   this.filterdAlog.push(ele);
          // })
        },
        err => console.log(err)
      );
  }

  saveChanges() {
  }
  editPlan() {

    this.router.navigate(['/settings/change-plan', this.planDetails === 'Level II' ? 'level2' : 'level1']);

  }

  upgradePlan() {
    this.router.navigate(['/settings/change-plan/upgrade']);
  }
  editCardDetails() {
  }

  viewBilling() {
  }
}
