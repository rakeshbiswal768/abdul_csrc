import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../../app/global';


@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  planList: any = [];
  initialPlanList: any = [];
  constructor(private router: Router, private route: ActivatedRoute, private commonApiService: CommonApiService) {
  }
  getFormattedData(input): any {
    // console.log(input);
    const ret = [];

    input.forEach((item, ind) => {

      const keys = Object.keys(item);
      let count = 0;
      keys.forEach((key, ind2, object) => {

        if (key === 'name' || key === 'licenseCostMonthly' || key === 'currency' || key === 'currencySymbol') {
          delete object[ind2];
        }
        else {
          if (ind === 0) {
            const result = key.replace(/([A-Z])/g, ' $1');
            ret.push([result.charAt(0).toUpperCase() + result.slice(1)]);
          }
          if (key === 'perTransferCost') {
            ret[count].push('€' + item[key] + '/per transfer')
          }
          else {
            ret[count].push(item[key]);
          }
          count++;
        }

      })

    })

    return ret;
  }

  ngOnInit() {
    this.commonApiService.getData(GlobalVariable.GET_LICENSE_MODELS)
      .subscribe(
        data => {
          this.initialPlanList = data;
          this.planList = this.getFormattedData(data);
        },
        err => console.log(err)
      );

  }

  isBoolean(val) {
    return typeof val === 'boolean'
  }

  isBooleanTrue(val) {
    return val === true;
  }
  createAccount(plan: string) {
    if (plan != null) {
      this.router.navigate(['registered/contact-info', plan]);
    }
    else {
      this.router.navigate(['trial/register']);
    }
  }



}
