import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../global';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-template-start-edit',
  templateUrl: './template-start-edit.component.html',
  styleUrls: ['./template-start-edit.component.css']
})
export class TemplateStartEditComponent implements OnInit {
  showWizard: boolean = false;

  constructor(public app: GlobalStorage, private sharedData: SharedDataService,
    private commonApiService: CommonApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  eventShowWizard(event){
    this.showWizard = event;
  }

  startWizard() {
    this.showWizard = true;
   // this.router.navigate(['/settings/start-wizard/1']);
  }

}
