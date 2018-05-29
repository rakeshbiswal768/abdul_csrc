import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SharedDataService } from '../shared-data.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { Dialog } from '../template-builder/dialog/dialog';
import { AsyncPipe } from '@angular/common';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { ConfirmationService } from 'primeng/primeng';
import { NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
// import {PopoverModule} from "ng2-popover";

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css'],
  providers: [NgbPopoverConfig]
})
export class TemplatesComponent implements OnInit {
  pageTitle = 'Your templates';
  checked = false;
  disabled = false;
  companyId: string;
  templateColn = [];
  infoTypes = [];
  infotypeId = '';
  displayInfoItem = '';
  msgs: Message[] = [];
  sortCol = 'name';
  showForms = true;
  constructor(public app: GlobalStorage, private sharedData: SharedDataService, private messageService: MessageService,
    private commonApiService: CommonApiService, private confirmationService: ConfirmationService, config: NgbPopoverConfig) {
    config.placement = 'right';
    // config.triggers = 'hover';
  }

  ngOnInit() {
    this.companyId = sessionStorage.getItem('companyId');
    this.sharedData.changeEmitted$.subscribe(showTB => {
      setTimeout(() => {
        if (showTB === false) {
          this.getTemplateColn();
        }
      }, 0)

    });
    this.getTemplateColn();
    this.getInformationTypes();
  }
  getSortColumn() {
    this.sortCol = (this.sortCol.charAt(0) === '!' ? this.sortCol.substring(1) : '!' + this.sortCol);
  }

  getTemplateColn() {
    this.companyId = sessionStorage.getItem('companyId')
    this.commonApiService.getData(GlobalVariable.GET_COMPANYTEMPLATEFORMS_CID.
      replace('${companyId}', this.companyId) + '?orderBy=DESC')
      .subscribe(
        data => {
          this.templateColn = data;
        },
        err => console.log(err),
        () => console.log('done')
      );
  }



  editTemplate(templateId) {
    this.sharedData.emitTempChangeId(templateId);
    this.sharedData.emitChange(true);
  }

  changeInfoType(item, infotypeId, infoTypeName) {
    this.infotypeId = infotypeId;
    item.informationType.name = infoTypeName;
    // console.log(this.sharedData.templateData);
    const body = {
      'informationTypeId': this.infotypeId // this.informationTypeId,
    }
    this.commonApiService.patchData(GlobalVariable.PUT_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
      .replace('${templateFormId}', item.id), body)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information type is changed' });
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error changing Information type' });
        });
  }

  getInformationTypes() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_INFORMATIONTYPES_COMPANYID.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.infoTypes = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  changeToggle(i) {
    this.templateColn[i].isActive = !this.templateColn[i].isActive;
    const body = {
      'isActive': this.templateColn[i].isActive
    }
    this.commonApiService.patchData(GlobalVariable.PATCH_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
      .replace('${templateFormId}', this.templateColn[i].id), body)
      .subscribe(
        data => {
        },
        err => console.log(err));
  }

  newTemplate() {
    this.sharedData.emitTempChangeId('');
    this.sharedData.emitChange(true);
  }

  editInfotype() {
    this.showForms = false;
  }

  setShowForm(showEvent) {
    this.showForms = showEvent;
    this.getInformationTypes();
  }

  deleteTemplate(templateId) {
    document.body.click();
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the form?',
      accept: () => {
        setTimeout(() => {
          this.delTemplate('yes', templateId);
        }, 0)
      },
      reject: () => {

      }
    });

  }
  JsonSchPersonalInfo =
    {
      "type": "object",
      "properties": {
        "Name": {
          "type": [
            "string",
            "null"
          ]
        },
        "Address": {
          "type": [
            "string",
            "null"
          ]
        },
        "Mobile": {
          "type": [
            "string",
            "null"
          ]
        },
        "Email": {
          "type": [
            "string",
            "null"
          ],
          "format": "email"
        },
        "Age": {
          "type": "integer"
        },
        "Country": {
          "type": [
            "string",
            "null"
          ]
        },
        "Nationality": {
          "type": [
            "string",
            "null"
          ]
        },
        "LanguagesSpoken": {
          "type": [
            "array",
            "null"
          ],
          "items": {
            "type": [
              "string",
              "null"
            ]
          }
        },
        "Gender": {
          "type": [
            "string",
            "null"
          ]
        },
        "SocialSecurityNumber": {
          "type": [
            "string",
            "null"
          ]
        },
        "MaritalStatus": {
          "type": [
            "string",
            "null"
          ]
        }
      }
    }


  submitFromData(event) {
    alert("submitting");
  }
  delTemplate(change, templateId) {
    if (change === 'yes') {
      this.commonApiService.deleteData(GlobalVariable.DELETE_COMPANYTEMPLATEFORMS_CID_TID.replace('${companyId}', this.companyId)
        .replace('${templateFormId}', templateId))
        .subscribe(
          data => {
            this.templateColn = this.templateColn.filter(function (el) {
              return el.id !== templateId;
            });
          },
          err => console.log(err));
    }
  }
}
