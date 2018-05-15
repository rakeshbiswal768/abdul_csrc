import { Component, OnInit, ElementRef, ViewChild, HostListener, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { TbTemplateComponent } from '../items/tb-template.component';
import { SharedDataService } from '../shared-data.service';
import { TbComponent } from '../items/tb.component';
import { TbItem } from '../items/tb-item';
import { TempBuilderService } from '../items/temp-builder.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { MenuItem } from 'primeng/primeng';
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.css']
})
export class ImportDataComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  templateId = '';
  companyId = '';
  routeData: any;
  msgs: Message[] = [];
  requestId = '';
  name: string;
  dueDate: string;
  templateColn = [];
  showRecords = false;
  showTemplateData = false;
  showTemplates = true;
  templateName = '';
  templateData: any;
  informationType = [];
  informationTypeId = '';
  recordName = '';
  dueInDays: number;
  reqStatus = '';
  isDirtyRN = '';
  data: any;
  tableColumns: any;
  tableRows: any;
  elType: string = null;

  @ViewChild(TbTemplateComponent) tbTemp: TbTemplateComponent;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (event.target.getAttribute('name') == null && event.target.currentSrc == null) {
      this.data = null;
      return;
    }
    if (event.target.getAttribute('name') == null && event.target.currentSrc != null
      && event.target.currentSrc.indexOf('settings') === -1) {
      this.data = null;
      return;
    }
    if ((event.target.getAttribute('name') != null && event.target.getAttribute('name') !== 'safe-sidenav')
      && event.target.currentSrc == null) {
      this.data = null;
      return;
    }
  }

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService,
    private sharedData: SharedDataService, private tbService: TempBuilderService,
    private commonApiService: CommonApiService, private router: Router, private route: ActivatedRoute,
    private messageService: MessageService, private elementRef: ElementRef) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
    this.sharedData.templateData = [];
    this.tbService.openNavBar$.subscribe(data => setTimeout(() => this.openNavBar(data), 0));
  }

  openNavBar(data) {
    if (data.id === 'table') {
      this.tableColumns = data.value['0'];
      this.tableRows = data.value['1'];
    }
    else {
      this.tableColumns = null;
    }

    this.data = data;

    // this.sideNav.open();

  }
  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
      if (params['informationTypeId'] != null) {
        this.informationTypeId = params['informationTypeId'];
        this.showRecords = true;
        this.showTemplates = false;
        this.showTemplateData = false;
      }
      if (this.requestId !== '' && this.requestId != null && this.requestId !== 'New') {
        sessionStorage.setItem('requestId', this.requestId);
      }
    });
    if (this.requestId === '' || this.requestId == null) {
      this.requestId = sessionStorage.getItem('requestId');
    }
    this.name = sessionStorage.getItem('name');
    this.dueDate = sessionStorage.getItem('dueDate');
    this.dueInDays = +sessionStorage.getItem('dueInDays');
    this.reqStatus = sessionStorage.getItem('reqStatus');

    this.items = [];
    this.getTemplateColn();
    this.getReqCategories();
  }

  saveTemplateData() {
    const list = this.elementRef.nativeElement.querySelectorAll('.tmpItel-row');
    let order = 1;
    for (let i = 0; i < list.length; i++) {

      this.sharedData.templateData.forEach(element => {
        if (element.guid === list[i].getAttribute('data-guid')) {
          element.order = order;
        }
      });
      order++;
    };
    const jsonSchema = JSON.stringify([
      { "title": this.templateName },
      { "type": "array" },
      { "properties": this.sharedData.templateData }
    ]);

    // console.log(this.sharedData.templateData);
    const body = {
      'name': this.recordName,
      'jsonData': jsonSchema,
      //'jsonData': JSON.stringify(this.sharedData.templateData),
      'informationTypeIds': this.informationType
    }
    this.companyId = sessionStorage.getItem('companyId');
    // body = { "name": "My Collection name", "jsonData": "{\"dataElement\":\"test\"}" };
    this.commonApiService.postData(GlobalVariable.POST_REQUESTDATA_REQID
      .replace('${requestId}', this.requestId), body)
      .subscribe(
        data => {
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Record is Saved' }), 0);
          this.getLatestRequestStatus(this.requestId, this.companyId);
        },
        err => {
          console.log(err);
          if (err.error.hasErrors) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

          }
          else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Saving the record' }), 0);
          }
        },
        () => console.log('done')
      );

  }

  focusOutFunction(name) {
    //
    switch (name) {
      case 'recordName':
        this.isDirtyRN = this.recordName !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      default:
        break;
    }
  }
  focusFunction(name) {
    switch (name) {
      case 'recordName':
        this.isDirtyRN = 'is-upgraded is-focused';
        break;
      default:
        break;
    }
  }

  getLatestRequestStatus(requestId, companyId) {

    this.commonApiService.getData(GlobalVariable.GET_REQUEST.replace('${companyId}',
      companyId).replace('${requestId}', requestId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.reqStatus = data.requestStatus;
          this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
            + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);

        },
        err => {
          console.log(err);

        }
      );

  }

  cancelTemplateData() {
    this.showTemplates = true;
    this.showTemplateData = false;
  }

  getTemplateColn() {
    this.companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_COMPANYTEMPLATEFORMS_CID.
      replace('${companyId}', this.companyId) + '?active=true')
      .subscribe(
        data => {
          this.templateColn = data;
        },
        err => console.log(err),
        () => console.log('done')
      );
  }

  editTemplate(templateId) {
    this.showTemplates = false;
    this.showTemplateData = true;
    // this.showRecords = true;
    this.commonApiService.getData(GlobalVariable.GET_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
      .replace('${templateFormId}', templateId))
      .subscribe(
        td => {
          this.modifyTemplateData(td);
        },
        err => console.log(err),
        () => console.log('done')
      );
  }

  modifyTemplateData(td) {
    this.templateName = td.name;
    this.templateData = JSON.parse(td.jsonData);
    this.informationType.push(td.informationType.id);
    this.createTemplates(this.templateData);

  }

  createTemplates(templateData) {
    this.tbTemp.tbHost.viewContainerRef.clear();
    this.sharedData.templateData = [];
    let count = 0;
    // templateData.forEach(element => {
    let tempObj = templateData[2].properties;
    tempObj.forEach(element => {
      if (count !== 0 && element.id === 'header') {
        this.tbTemp.loadComponent('addBtn', '', null, false);
      }
      count++;
      if (element.id !== 'table') {
        this.tbTemp.loadComponent(element.id, element.value, element.type, false, '', element.value1, element.value2);
      }
      else {
        this.tbTemp.loadComponent(element.id, element.value, element.type, true);
        // this.tbTemp.loadComponent('addBtn', '', false);
      }
      // this.ddItems = [{ 'id': element[0].id, 'value': element[0].value }];
      // this.sharedData.templateData.push(this.ddItems);
    });
    this.tbTemp.loadComponent('addBtn', '', null, false);

  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  getReqCategories() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_CATEGORIES)
      .subscribe(
        data => {
          const reqCat = [];
          data.forEach(subCat => {
            const cats = [];
            const itemCat = {
              label: subCat.name,
              items: cats
            };
            subCat.subCategories.forEach(element => {
              const items = [];
              const item = {
                label: element.name,
                items: items
              };
              element.informationTypes.forEach(cat => {
                const label = {
                  label: cat.name, command: (event) => {
                    setTimeout(() => {
                      this.showTemplates = false;
                      this.showTemplateData = false;
                      this.showRecords = false;
                      this.showRecords = true;
                      this.informationTypeId = cat.id;
                      // this.router.navigate(['/users/import-data/' + this.requestId + '/' + cat.id]);
                      this.sharedData.emitTempChangeId(cat.id);
                    }, 0);

                  }
                };
                item.items.push(label);
              });
              itemCat.items.push(item);
            });
            reqCat.push(itemCat);
          });
          this.items = reqCat;
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
        },
        err => {
          console.log(err);
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
        },
        () => console.log('done')
      );
  }

  sendData() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.putData(GlobalVariable.PUT_READY_FOR_APPROVE.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data sent for approval' });
          this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error sending data' });
        },
        () => console.log('done')
      );

  }

  cancelDelivery() {
    const companyId = sessionStorage.getItem('companyId');

    this.commonApiService.putData(GlobalVariable.PUT_CANCEL_REQUEST.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Cancelled Delivery' });
          this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
            + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);
        },
        err => {
          console.log(err);
        },
        () => console.log('done')
      );

  }


}
