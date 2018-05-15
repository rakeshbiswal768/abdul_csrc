import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { GlobalVariable, GlobalStorage } from '../../../global';
import { CommonApiService } from '../../../api/common-api.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-information-types',
  templateUrl: './information-types.component.html',
  styleUrls: ['./information-types.component.css'],
  providers: [NgbAccordionConfig]
})
export class InformationTypesComponent implements OnInit {
  @Output()
  showForms = new EventEmitter<boolean>();
  categories = [];
  subCategories = [];
  infoTypes = [];
  infoTypesList = [];
  isActive = true;
  msgs: Message[] = [];
  // infoTypeSuccess: boolean = false;

  constructor(config: NgbAccordionConfig, public app: GlobalStorage, private messageService: MessageService,
    private commonApiService: CommonApiService) {
    // config.closeOthers = true;
    // config.type = 'InformationTypes';
  }

  ngOnInit() {
    this.getCatInformationTypes();
    this.getInformationTypes();
  }

  saveInfoTypes() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Currently selected Information type(s) is Saved' })
    this.showForms.emit(true);
  }
  cancelInfoTypes() {
    this.showForms.emit(true);
  }
  getInformationTypes() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_INFORMATIONTYPES_COMPANYID.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.infoTypesList = data;
        },
        err => {
          console.log(err);
        }
      );
  }

  getCatInformationTypes() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_CATEGORIES)
      .subscribe(
        data => {
          let count = 0;
          data.forEach(element => {
            let cat = {
              id: element.id,
              name: element.name
            }
            this.categories[count] = cat;
            this.subCategories[count] = element.subCategories;

            count++;
          });
          // this.categories = data;
          // this.subCategories = data.subCategories;
        },
        err => {
          console.log(err);
        }
      );
  }

  getActiveInfoType(id) {
    return this.infoTypesList.findIndex(el => el.id === id) !== -1;
  }

  setInfoTypeActive(id) {
    const companyId = sessionStorage.getItem('companyId');
    const body = {
      "id": id
    }
    this.commonApiService.putData(GlobalVariable.PUT_INFORMATIONTYPES.replace('${companyId}', companyId), body)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully Activated selected Information type' });
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information type is changed' });
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error making Information type Active' });
        }
      );

  }

  deleteInfoType(id) {
    const companyId = sessionStorage.getItem('companyId');

    this.commonApiService.deleteData(GlobalVariable.PUT_INFORMATIONTYPES.replace('${companyId}', companyId) + '?id=' + id)
      .subscribe(
        data => {
          //this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information type is changed' });
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully InActivated selected Information type' });
        },
        err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error making Information type InActive' });
        }
      );

  }

  setActiveInfoType(id, event) {
    if (event.target.checked) {
      this.setInfoTypeActive(id);
    }
    else {
      this.deleteInfoType(id);
    }
  }
}
