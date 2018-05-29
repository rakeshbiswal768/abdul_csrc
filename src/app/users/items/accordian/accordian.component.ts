import { Component, OnInit, Input, Inject, forwardRef, ViewChild } from '@angular/core';
import { SharedDataService } from '../../shared-data.service'
import { TbAccTemplateComponent } from '../../items/tb-Acctemplate.component'
import { TbComponent } from '../../items/tb.component';
import { TbItem } from '../../items/tb-item';
import { Guid } from '../../items/guid';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../global';

@Component({
  selector: 'app-accordian',
  templateUrl: './accordian.component.html',
  styleUrls: ['./accordian.component.css']
})
export class AccordianComponent implements OnInit {
  @Input() data: any;
  @ViewChild(forwardRef(() => TbAccTemplateComponent))
  tbTempAccordian: TbAccTemplateComponent;
  guid = '';
  // templateNameHeader = 'Oct 2017';
  templateName = '';
  companyId: string;
  templateData: any;
  elType: string = null;

  constructor(public sharedData: SharedDataService) {
  }

  ngOnInit() {
    this.getSelectedTemplate();
  }

  getSelectedTemplate() {
    this.createTemplates(JSON.parse(this.data.data.jsonData), this.data.header);
  }

  createTemplates(templateData, templateName) {
    // this.tbTempAccordian.tbHost.viewContainerRef.clear();
    // this.sharedData.templateData = [];
    // templateData.forEach(element => {
    let tempObj = templateData[2].properties;
    tempObj.forEach(element => {
      if (element.data != null) {
        this.tbTempAccordian.loadComponent(element.id, element, element.type, true, templateName, element.value1, element.value2);
      }
      // this.ddItems = [{ 'id': element[0].id, 'value': element[0].value }];
      // this.sharedData.templateData.push(this.ddItems);
    });

  }

}
