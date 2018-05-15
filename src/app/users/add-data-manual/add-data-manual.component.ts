import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { TbTemplateComponent } from '../items/tb-template.component'
import { SharedDataService } from '../shared-data.service'
import { TbComponent } from '../items/tb.component';
import { TbItem } from '../items/tb-item';
import { TempBuilderService } from '../items/temp-builder.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { Guid } from '../items/guid'
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DragulaService } from 'ng2-dragula';
import { MenuItem } from 'primeng/primeng';

@Component({
  selector: 'app-add-data-manual',
  templateUrl: './add-data-manual.component.html',
  styleUrls: ['./add-data-manual.component.css'],

})
export class AddDataManualComponent implements OnInit, OnDestroy {
  templateName = '';
  @ViewChild(TbTemplateComponent) tbTemp: TbTemplateComponent;
  tbs: TbItem[];
  ddItems: any = [];
  categories: string[] = ['Internal'
    , 'Historical'
    , 'Financial'
    , 'External'
    , 'Tracking'
    , 'Social'];
  autocompleteTags = [];
  templateId: string;
  companyId: string;
  isActive: boolean;
  templateData: any;
  successMessage = '';
  errorMessage = '';
  routeData: any;
  msgs: Message[] = [];
  items: MenuItem[];
  requestId = '';
  data: any;
  tableColumns: any;
  tableRows: any;
  name: string;
  dueDate: string;
  informationTypeId = '';
  informationTypeName = '';
  infoTypes = [];
  informationType = [];
  dueInDays: number;
  reqStatus = '';
  showRecords = false;
  informationTypeIdSel = '';

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
    public sharedData: SharedDataService, private dragulaService: DragulaService, private elementRef: ElementRef,
    private tbService: TempBuilderService, private commonApiService: CommonApiService, private router: Router,
    private route: ActivatedRoute, private messageService: MessageService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
    this.sharedData.templateData = [];
    this.tbService.openNavBar$.subscribe(data => setTimeout(() => this.openNavBar(data), 0));
    dragulaService.drag.subscribe((value) => {
      // console.log(value);
      this.onDrag(value.slice(1));
    });
    dragulaService.drop.subscribe((value) => {
      // console.log(value);
      this.onDrop(value.slice(1));
    });
    dragulaService.over.subscribe((value) => {
      this.onOver(value.slice(1));
    });
    dragulaService.out.subscribe((value) => {
      this.onOut(value.slice(1));
    });
    dragulaService.dropModel.subscribe((value) => {
      // console.log(`dropModel: ${value[0]}`);
      this.onDropModel(value);
    });
  }

  private onDropModel(args) {
    const [bagName, el, target, source] = args;
    // do something, such as sync items with the server.
    // or setting a flag to indicate if items is different from when it was last saved
  }

  private hasClass(el: any, name: string) {
    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
  }

  private addClass(el: any, name: string) {
    if (!this.hasClass(el, name)) {
      el.className = el.className ? [el.className, name].join(' ') : name;
    }
  }

  private removeClass(el: any, name: string) {
    if (this.hasClass(el, name)) {
      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
    }
  }

  private onDrag(args) {
    const [e, el] = args;
    // console.log('onDrag');
    // console.log(args);
    this.removeClass(e, 'ex-moved');
  }

  private onDrop(args) {
    const [e, el] = args;

    this.addClass(e, 'ex-moved');
    console.log(this.sharedData.templateData);
  }
  private getElementIndex(el: any) {
    return [].slice.call(el.parentElement.children).indexOf(el);
  }
  private onOver(args) {
    const [e, el, container] = args;
    // console.log('onOver');
    // console.log(args);
    this.addClass(el, 'ex-over');
  }

  private onOut(args) {
    const [e, el, container] = args;
    // console.log('onOut');
    // console.log(args);
    this.removeClass(el, 'ex-over');
    //  console.log(this.sharedData.templateData);
  }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
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
    this.getInformationTypes();
    this.getReqCategories();
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  addItem(id, dType) {
    // this.isActive = true;
    // this.ddItems = { 'id': id,'value':'', 'data': '' };
    // this.sharedData.templateData.push(this.ddItems);
    this.tbTemp.loadComponent(id, '', dType, false);

  }

  openNavBar(data) {
    if (data.id === 'table') {
      this.tableColumns = data.data['0'];
      this.tableRows = data.data['1'];
    }
    else {
      this.tableColumns = null;
    }

    this.data = data;
  }
  cancelAction() {
    this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
      + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);
  }

  sortByName(x, y) {
    const sortColumnName = 'order';
    return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
  }

  focusOutFunction() {
    // this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem(this.data.id, this.data);
  }
  focusFunction() {
    // this.inputFocusClass = false;
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
    this.sharedData.templateData.sort(this.sortByName);
    this.informationType.push(this.informationTypeId);
    const jsonSchema = JSON.stringify([
      { "title": this.templateName },
      { "type": "array" },
      { "properties": this.sharedData.templateData }
    ]);
    const body = {
      'name': this.templateName,
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
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data is Saved' });
          this.getLatestRequestStatus(this.requestId, this.companyId);

        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Adding Data' });
        },
        () => console.log('done')
      );
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

  getInformationTypes() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_INFORMATIONTYPES_COMPANYID.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.infoTypes = data;
          this.informationTypeId = data.length > 0 ? data['0'].id : '';
          this.informationTypeName = data.length > 0 ? data['0'].name : '';
        },
        err => {
          console.log(err);
        });
  }

  changeInfoType(infotypeId, infoTypeName) {
    this.informationTypeId = infotypeId;
    this.informationTypeName = infoTypeName;
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
                    // setTimeout(() => {
                    //   this.router.navigate(['/users/import-data/' + this.requestId + '/' + cat.id]);
                    // }, 0);
                    this.showRecords = false;
                    this.showRecords = true;
                    this.informationTypeIdSel = cat.id;
                    this.sharedData.emitTempChangeId(cat.id);

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

}
