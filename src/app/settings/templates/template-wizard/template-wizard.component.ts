import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedDataService } from '../../shared-data.service';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../global';
import { Router, ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-template-wizard',
  templateUrl: './template-wizard.component.html',
  styleUrls: ['./template-wizard.component.css']
})
export class TemplateWizardComponent implements OnInit {
  @Output()
  showWizard = new EventEmitter<boolean>();
  isLinear = true;
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  NextStepWizard(stepper: MatStepper) {
    stepper.next();
  }

  cancelTmplStepper() {
    this.showWizard.emit(false);
  }
  
}
