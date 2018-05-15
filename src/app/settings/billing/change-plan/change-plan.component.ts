import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SafePipe } from './safe.pipe'

@Component({
  selector: 'app-change-plan',
  templateUrl: './change-plan.component.html',
  styleUrls: ['./change-plan.component.css']
})
export class ChangePlanComponent implements OnInit {
  myInnerHeight = window.innerHeight;
  routeData: any;
  planId = '';
  iframeUrl = '';
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.planId = params['planId'];
      sessionStorage.setItem('planId', this.planId);
      this.iframeUrl = 'https://www.idlink.eu/app/plans?id=' + this.planId;
    });
  }

}
