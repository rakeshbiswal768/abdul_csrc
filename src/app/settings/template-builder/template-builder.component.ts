import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit, HostListener } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { SharedDataService } from '../shared-data.service'
import { TbTemplateComponent } from './tb-template.component';
import { TbComponent } from './tb.component';
import { TbItem } from './tb-item';
import { TempBuilderService } from './temp-builder.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { Guid } from './guid';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { DragulaService } from 'ng2-dragula';
// declare var jQuery: any;

@Component({
  selector: 'app-template-builder',
  templateUrl: './template-builder.component.html',
  styleUrls: ['./template-builder.component.css']
})
export class TemplateBuilderComponent implements OnInit, AfterViewInit {
  dragEl: any;
  hideDrag: boolean;
  domNode: HTMLElement = null;
  templateName = '';
  @ViewChild(TbTemplateComponent) tbTemp: TbTemplateComponent;
  @ViewChild('sidenav') sideNav: MatSidenav;
  tbs: TbItem[];
  ddItems: any = [];
  informationTypeId = '';
  informationTypeName = '';
  infoTypes = [];
  templateFormId = '';
  autocompleteTags = [];
  templateId: string;
  companyId: string;
  isActive: boolean;
  templateData: any;
  successMessage = '';
  errorMessage = '';
  data: any;
  isUpdate = false;
  msgs: Message[] = [];
  tableColumns: any;
  tableRows: any;
  elType: string = null;
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
  constructor(public app: GlobalStorage, public sharedData: SharedDataService, private tbService: TempBuilderService,
    private messageService: MessageService, private dragulaService: DragulaService,
    private elementRef: ElementRef, private commonApiService: CommonApiService) {

    this.sharedData.templateData = [];
    this.tbService.openNavBar$.subscribe(data => setTimeout(() => this.openNavBar(data), 0));
    this.companyId = sessionStorage.getItem('companyId');
    this.sharedData.emitTemplateId$.subscribe(id => {
      this.successMessage = '';
      this.errorMessage = '';
      this.getInformationTypes();
      if (id !== '') {
        this.hideDrag = true;
        this.templateFormId = id;
        this.isUpdate = true;
        this.commonApiService.getData(GlobalVariable.GET_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
          .replace('${templateFormId}', this.templateFormId))
          .subscribe(
            td => {
              this.modifyTemplateData(td);
            },
            err => console.log(err),
            () => console.log('done')
          );
      }
      else {
        this.tbTemp.tbHost.viewContainerRef.clear(); this.sharedData.templateData = [];
        this.templateData = [];
        this.templateId = '';
        this.templateName = '';
        this.hideDrag = false;
        this.isActive = true;
        this.isUpdate = false;
        this.autocompleteTags = [];
      }
    }
    );
    // console.log(this.domNode);
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
  modifyTemplateData(td) {
    this.templateId = td.id;
    this.templateName = td.name;
    this.templateData = JSON.parse(td.jsonData);
    this.isActive = td.isActive;
    this.informationTypeName = td.informationType.name
    this.informationTypeId = td.informationType.id;
    this.createTemplates(this.templateData);

  }
  ngOnInit() {
    this.getInformationTypes();
    // this.messageService.clear();

  }
  ngAfterViewInit() {
    // this.sideNav.nativeElement.open();

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
        },
        () => console.log('done')
      );
  }

  changeInfoType(infotypeId, infoTypeName) {
    this.informationTypeId = infotypeId;
    this.informationTypeName = infoTypeName;

  }

  createTemplates(templateData) {
    this.tbTemp.tbHost.viewContainerRef.clear();
    this.sharedData.templateData = [];
    let tempObj = templateData[2].properties;
    tempObj.forEach(element => {
      if (element.id !== 'table') {
        this.tbTemp.loadComponent(element.id, element.value, element.type, false, element.value1, element.value2);
      }
      else {
        this.tbTemp.loadComponent(element.id, element.value, element.type, true);
      }
      // this.ddItems = [{ 'id': element[0].id, 'value': element[0].value }];
      // this.sharedData.templateData.push(this.ddItems);
    });

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

    // this.sideNav.open();

  }

  dragStart(event, dragEl) {
    // console.log(event);
    this.dragEl = dragEl;
    // event.dataTransfer.setData("text", dragEl.innerHTML);
    // console.log(dragEl);
  }

  drop(event, divEl) {
    this.hideDrag = true;
    this.isActive = true;
    this.tbTemp.loadComponent(this.dragEl.id, '', this.dragEl.getAttribute('dataeltype'), false);
    // this.sharedData.templateData.sort(this.sortByName);
    // Call Sort By Name
    // console.log(this.sharedData.templateData);
  }
  sortByName(x, y) {
    const sortColumnName = 'order';
    return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
  }

  focusOutFunction() {
    // this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem(this.data.id, this.data.value);
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
    const jsonSchema = JSON.stringify([
      { "title": this.templateName },
      { "type": "array" },
      { "properties": this.sharedData.templateData }
    ]);
    const body = {
      //'jsonData': JSON.stringify(this.sharedData.templateData),
      'jsonData': jsonSchema,
      'name': this.templateName,
      'informationTypeId': this.informationTypeId // this.informationTypeId,
    }
    if (this.isUpdate) {
      this.commonApiService.putJsonData(GlobalVariable.PUT_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
        .replace('${templateFormId}', this.templateId), body)
        .subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Input Form is saved' });
            this.sharedData.emitChange(false);
          },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Saving Input Form' });
          },
          () => console.log('done')
        );
    }
    else {
      this.commonApiService.postData(GlobalVariable.POST_COMPANYTEMPLATEFORMS_CID.replace('${companyId}', this.companyId), body)
        .subscribe(
          data => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Input Form is saved' });
            this.sharedData.emitChange(false);
          },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Saving Input Form' });
          },
          () => console.log('done')
        );
    }
  }
  dragEnd(event) {
    // console.log(event);
    this.dragEl = null;
  }

  callCloseTB() {
    this.sharedData.emitChange(false);
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
}
