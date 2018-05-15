import { Component, OnInit } from '@angular/core';
import { GlobalVariable, GlobalStorage } from '../../../app/global';
import { CommonApiService } from '../../../app/api/common-api.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  companyId = '';
  logo = '';
  profileName = '';
  dateFormat = '';
  btnFormat = '';
  aFormat = '';
  imageData: any;
  planDetails = '';
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private router: Router, private route: ActivatedRoute) { }

  getCompanyLogo() {
    this.companyId = sessionStorage.getItem('companyId');
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId);
    // this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId)
    //   + '?' + new Date().getTime();
    if (this.imageData === null || this.imageData === undefined) {
      this.imageData = '/assets/images/idlink_id_logo.svg';
    }
  }
  ngOnInit() {
    this.getCompanyLogo();
    this.profileName = sessionStorage.getItem('profileName');
    // this.logo = sessionStorage.getItem('logo');
    // this.dateFormat = sessionStorage.getItem('dateFormat');
    // this.btnFormat = sessionStorage.getItem('buttonColor');
    // this.aFormat = sessionStorage.getItem('accentColor');
  }

  getPlanDetails() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_LICENSE_PLAN.replace('${companyid}', companyId))
      .subscribe(
        data => {
          // this.cardHolderName = data.item3.stripeCreditCardName;
          // this.cardDetails = data.item3.stripeCreditCardLastFourDigits;
          // this.cardExpiryMonth = data.item3.stripeCreditCardExpirationMonth;
          // this.cardExpiryYear = data.item3.stripeCreditCardExpirationYear.slice(-2);
          this.planDetails = data.item3.stripeSubscriptionPlanName;
          // this.planCurrency = data.item3.stripeSubscriptionCurrency;
          // this.planCharges = data.item3.stripeSubscriptionAmount;
          // this.planInterval = data.item3.stripeSubscriptionInterval;
          // this.auditlog = data;
          // this.auditlog.forEach(element => {
          //   this.filterAction.push(element.activityType);
          // })
          // let set = new Set(this.filterAction);
          // set.forEach(ele => {
          //   this.filterdAlog.push(ele);
          // })
        },
        err => console.log(err),
        () => {
          if (this.planDetails === 'trial' || this.planDetails === '') {
            //[routerLink]="['/settings/change-plan/upgrade']"
            this.router.navigate(['/settings/change-plan/upgrade']);

          } else {
            this.router.navigate(['/settings/change-plan', this.planDetails === 'Level II' ? 'level2' : 'level1']);

          }
        }
      );
  }
  editPlan() {
    this.getPlanDetails();
  }

}
