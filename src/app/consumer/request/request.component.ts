import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { InputSwitchModule } from 'primeng/primeng';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})

export class RequestComponent implements OnInit, OnDestroy {
  routeData: any;
  companyId: string = '';
  imageData: any;
  nextUrl: any = '';
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService,
    private router: Router, private route: ActivatedRoute, public consumerService: ConsumerService) {
    this.routeData = this.route.params.subscribe(params => {
      this.companyId = params['companyId'];
      sessionStorage.setItem('companyId', this.companyId);
    })
  }
  ngOnInit() {
    //this.routeData = this.route.params.subscribe(params => {
    //  this.companyId = params['companyId'];
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId);
    if (this.companyId !== null && this.companyId !== '') {
      this.getAllCategories();
    }
    // });
  }
  nextBtn() {
    this.nextUrl = 'verify-request/' + this.companyId;
    this.router.navigate(['/consumer/verify-request/' + this.companyId]);
  }
  ngOnDestroy() {
    this.routeData.unsubscribe();
  }
  handleChange(e, i) {
    this.consumerService.categories[i].isActive = e.checked;
  }
  includeAll() {
    this.consumerService.categories.forEach(category => category.isActive = true);
  }
  getAllCategories() {
    this.consumerService.categories = [];
    this.commonApiService.getData(GlobalVariable.GET_INFORMATIONTYPES_COMPANYID.replace('${companyId}', this.companyId))
      .subscribe(
        data => {
          data.forEach(element => {
            const category = { 'name': element.name, 'isActive': false };
            this.consumerService.categories = this.consumerService.categories.concat(category);
          });
        },
        err => console.log(err));
  }
}
