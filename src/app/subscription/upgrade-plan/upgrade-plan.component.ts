import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Plan } from '../model/plan';

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrls: ['./upgrade-plan.component.css']
})
export class UpgradePlanComponent implements OnInit {
  planList = [new Plan('Number of system users', '2', '2', '2', '2'),
  new Plan('Complete Audit log', 'checked', 'checked', 'checked', 'checked'),
  new Plan('Multifactor Authentication*', 'checked', 'checked', 'checked', 'checked'),
  new Plan('Raw data transfer', 'checked', 'checked', 'checked', 'checked')];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  createAccount(plan: string) {
    if (plan != null) {
      this.router.navigate(['registered/payment-details', plan]);
    }
    else {
      this.router.navigate(['trial/register']);
    }
  }

}
