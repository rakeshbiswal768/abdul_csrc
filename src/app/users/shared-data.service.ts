import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { CommonApiService } from '../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../global';

@Injectable()
export class SharedDataService {
  closeTB = false;
  templateData: any = [];
  // Observable string sources
  private emitChangeSource = new Subject<any>();
  private emitChangeForNav = new Subject<any>();
  private emitTempId = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  openNavBar$ = this.emitChangeForNav.asObservable();
  emitTemplateId$ = this.emitTempId.asObservable();
  constructor(public app: GlobalStorage, private commonApiService: CommonApiService) { }

  // Service message commands
  emitChange(change: any) {
    this.emitChangeSource.next(change);
  }
  // Service message commands
  emitChangeNav(change: any) {
    this.emitChangeForNav.next(change);
  }

  // Service message commands
  emitTempChangeId(change: any) {
    this.emitTempId.next(change);
  }

  setDataToTemplateItem(id, data, guid?) {
    if (data != null && data !== '') {
      this.templateData.forEach(element => {
        if (id === 'address' && element.id === id && element.guid === guid) {
          element.addressLine1 = data.addressLine1;
          element.addressLine2 = data.addressLine2;
          element.city = data.city;
          element.postalCode = data.postalCode;
        }
        else if (id === 'fullName' && element.id === id && element.guid === guid) {
          element.firstName = data.firstName;
          element.lastName = data.lastName;
          element.value1 = data.value1 ? data.value1 : 'First Name';
          element.value2 = data.value2 ? data.value2 : 'Last Name';
        }
        else if (id === 'table' && element.id === id && element.guid === guid) {
          element.value = data;
          element.data = data;
        }
        else if (id === 'dateRange' && element.id === id && element.guid === guid) {
          element.value = data.value;
          element.value1 = data.value1;
          element.value2 = data.value2;
          element.valueFrom = data.valueFrom;
          element.valueTo = data.valueTo;
        }
        else if (element.id === id && element.guid === guid) {
          element.value = data.value;
          element.data = data.data;
        }
      });
    }
  }

}
