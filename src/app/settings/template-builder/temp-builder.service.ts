import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AddressComponent } from './items/address/address.component'
import { DateComponent } from './items/date/date.component'
import { DateRangeComponent } from './items/date-range/date-range.component'
import { EmailComponent } from './items/email/email.component'
import { FullNameComponent } from './items/full-name/full-name.component'
import { HeaderComponent } from './items/header/header.component'
import { LongTextComponent } from './items/long-text/long-text.component'
import { NumberComponent } from './items/number/number.component'
import { PhoneComponent } from './items/phone/phone.component'
import { ShortTextComponent } from './items/short-text/short-text.component'
import { TableComponent } from './items/table/table.component'
import { TbItem } from './tb-item';

@Injectable()
export class TempBuilderService {
  private emitChangeForNav = new Subject<any>();
  openNavBar$ = this.emitChangeForNav.asObservable();
  constructor() { }

  emitChangeNav(change: any) {
    this.emitChangeForNav.next(change);
  }
  getTbs(compType: string) {

    switch (compType) {
      case 'address': {
        //  console.log('Address');
        return [
          new TbItem(AddressComponent, { id: 'address', value: 'Address', order: 1 })
        ];
        // break;
      }
      case 'date': {
        //  console.log('Address');
        return [
          new TbItem(DateComponent, { id: 'date', value: 'Date', order: 2 })
        ];
        // break;
      }
      case 'dateRange': {
        //  console.log('Address');
        return [
          new TbItem(DateRangeComponent, { id: 'dateRange', value: 'Date Range', value1: 'From', value2: 'To', order: 3 })
        ];
        // break;
      }
      case 'email': {
        //  console.log('Address');
        return [
          new TbItem(EmailComponent, { id: 'email', value: 'Email', order: 4 })
        ];
        // break;
      }
      case 'fullName': {
        //  console.log('Address');
        return [
          new TbItem(FullNameComponent, { id: 'fullName', value: 'Full Name', value1: 'First Name', value2: 'Last Name', order: 5 })
        ];
        // break;
      }
      case 'header': {
        //  console.log('Address');
        return [
          new TbItem(HeaderComponent, { id: 'header', value: 'Header', order: 6 })
        ];
        // break;
      }
      case 'lte': {
        //  console.log('Header');
        return [
          new TbItem(LongTextComponent, { id: 'lte', value: 'Long Text Entry', order: 7 })
        ];
        // break;
      }
      case 'number': {
        //  console.log('Header');
        return [
          new TbItem(NumberComponent, { id: 'number', value: 'Number', order: 8 })
        ];
        // break;
      }
      case 'phone': {
        //  console.log('Header');
        return [
          new TbItem(PhoneComponent, { id: 'phone', value: 'Phone', order: 9 })
        ];
        // break;
      }
      case 'ste': {
        //  console.log('Header');
        return [
          new TbItem(ShortTextComponent, { id: 'ste', value: 'Short Text Entry', order: 10 })
        ];
        // break;
      }
      case 'table': {
        //  console.log('Header');
        return [
          new TbItem(TableComponent, { id: 'table', value: 'Table', inComponent: false, order: 11 })
        ];
        // break;
      }
      default: {
        console.log('Invalid choice');
        // return [
        //   new TbItem(AddressComponent, { name: 'Bombasto', value: '' })
        // ];
        // break;
      }
    }

  }
}
