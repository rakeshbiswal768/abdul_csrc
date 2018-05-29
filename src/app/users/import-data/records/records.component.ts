import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit, Input } from '@angular/core';
import { TbTemplateComponent } from '../../items/tb-template.component'
import { SharedDataService } from '../../shared-data.service'
import { TbComponent } from '../../items/tb.component';
import { TbItem } from '../../items/tb-item';
import { TempBuilderService } from '../../items/temp-builder.service';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../global';
import { Guid } from '../../items/guid';
import { fadeInContent } from '@angular/material';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {
  step = 0;
  @Input() informationTypeId: string;
  templateNameHeader = 'Oct 2017';
  templateName = '';
  companyId: string;
  isActive: boolean;
  templateColn: any = [];
  msgs: Message[] = [];
  templateData: any;
  categories: string[] = ['Financial', 'IT', 'Admin'];
  autocompleteTags = [];
  successMessage = '';
  errorMessage = '';
  index: number = -1;
  informationType = [];
  elType: string = null;

  @ViewChild(TbTemplateComponent) tbTemp: TbTemplateComponent;
  constructor(public app: GlobalStorage, private sharedData: SharedDataService, private messageService: MessageService,
    private tbService: TempBuilderService, private commonApiService: CommonApiService) {
    // this.sharedData.templateData = [];
    this.sharedData.emitTemplateId$.subscribe(tempId => {
      this.templateName = tempId;
      this.getSelectedTemplate(tempId);
    }
    );
  }

  ngOnInit() {
    // this.getSelectedTemplate(this.templateId);
    // this.getSelectedTemplate('test1');
    // this.templateId = '095df15c-c547-4af9-bb87-bbb66533414a';
    this.getSelectedTemplate(this.informationTypeId);

  }

  getSelectedTemplate(infoTypeId) {
    this.getRequestDatafromInfoType(infoTypeId);
  }

  getRequestDatafromInfoType(infoTypeId) {
    const requestId = sessionStorage.getItem('requestId');
    this.commonApiService.getData(GlobalVariable.GET_REQUESTDATA_ID.replace('${requestId}', requestId)
      + '/?informationTypeId=' + infoTypeId)
      .subscribe(
        data => {
          this.tbTemp.tbHost.viewContainerRef.clear();
          this.sharedData.templateData = [];
          data.forEach(element => {
            if (element.storageId == null) {
              this.tbTemp.loadComponent('accordian', element, null, false, element.name);
            }
          });


        },
        err => {
          console.log(err);
          if (err.error) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error }), 0);

          }
          else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching the records' }), 0);
          }
        });

  }

  openNext() {
    this.index = (this.index === 3) ? 0 : this.index + 1;
  }

  openPrev() {
    this.index = (this.index <= 0) ? 3 : this.index - 1;
  }

  modifyTemplateData(td) {
    // this.autocompleteTags = td.categories;
    // this.templateName = td.name;
    // this.templateData = JSON.parse(td.templateData);
    // this.isActive = td.isActive;
    this.createTemplates(this.templateData);

  }
  addItem(id) {
    // this.isActive = true;
    // this.ddItems = { 'id': id,'value':'', 'data': '' };
    // this.sharedData.templateData.push(this.ddItems);
    this.tbTemp.loadComponent(id, '', null, false);

  }
  createTemplates(templateData) {
    this.tbTemp.tbHost.viewContainerRef.clear();
    this.sharedData.templateData = [];
    // templateData.forEach(element => {
    let tempObj = templateData[2].properties;
    tempObj.forEach(element => {
      this.tbTemp.loadComponent(element.id, element.value, element.type, false, '', element.value1, element.value2);
      // this.ddItems = [{ 'id': element[0].id, 'value': element[0].value }];
      // this.sharedData.templateData.push(this.ddItems);
    });

  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


  saveTemplateData() {
    this.companyId = sessionStorage.getItem('companyId');
    console.log(this.sharedData.templateData);
    const jsonSchema = JSON.stringify([
      { "title": this.templateName },
      { "type": "array" },
      { "properties": this.sharedData.templateData }
    ]);
    const body = {
      'name': this.templateName,
      'jsonData': jsonSchema,
      //'jsonData': '{ \'dataElement\':' + JSON.stringify(this.sharedData.templateData) + '}',
      'informationTypeIds': this.informationType
    }
    // body = { "name": "My Collection name", "jsonData": "{\"dataElement\":\"test\"}" };
    // this.commonApiService.patchData(GlobalVariable.PATCH_REQUESTDATA_ID
    //   .replace('${requestId}', this.templateId), body)
    //   .subscribe(
    //   data => {
    //     console.log(data);
    //     this.successMessage = 'Template is saved';
    //     this.errorMessage = null;
    //     // this.router.navigate(['trial/inst-sent']);
    //   },
    //   err => {
    //     console.log(err);
    //     this.errorMessage = 'Error Saving Template';
    //     this.successMessage = null;
    //   },
    //   () => console.log('done')
    //   );
  }
}
