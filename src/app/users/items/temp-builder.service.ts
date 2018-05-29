import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { AddressComponent } from './address/address.component';
import { DateComponent } from './date/date.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { EmailComponent } from './email/email.component';
import { FullNameComponent } from './full-name/full-name.component';
import { HeaderComponent } from './header/header.component';
import { LongTextComponent } from './long-text/long-text.component';
import { NumberComponent } from './number/number.component';
import { PhoneComponent } from './phone/phone.component';
import { ShortTextComponent } from './short-text/short-text.component';
import { TableComponent } from './table/table.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { AccordianComponent } from './accordian/accordian.component';
import { TbItem } from './tb-item';

@Injectable()
export class TempBuilderService {
  private emitChangeForNav = new Subject<any>();
  openNavBar$ = this.emitChangeForNav.asObservable();
  constructor(private http: Http) { }

  emitChangeNav(change: any) {
    this.emitChangeForNav.next(change);
  }
  getTbs(compType: string) {

    switch (compType) {
      case 'accordian': {
        return [
          new TbItem(AccordianComponent, {
            id: 'accordian', value: '', data: '', order: 13
          })
        ];
      }
      case 'addBtn': {
        return [
          new TbItem(AddButtonComponent, {
            id: 'addBtn', value: '', data: '', order: 12
          })
        ];
      }
      case 'address': {
        return [
          new TbItem(AddressComponent, {
            id: 'address', value: 'Address', addressLine1: '',
            addressLine2: '', city: '', postalCode: '', order: 1
          })
        ];
      }
      case 'date': {
        //  console.log('Address');
        return [
          new TbItem(DateComponent, { id: 'date', value: 'Date', data: '', order: 2 })
        ];
        // break;
      }
      case 'dateRange': {
        //  console.log('Address');
        return [
          new TbItem(DateRangeComponent, { id: 'dateRange', value: 'Date Range', value1: 'From', value2: 'To', valueFrom: '', valueTo: '', order: 3 })
        ];
        // break;
      }
      case 'email': {
        //  console.log('Address');
        return [
          new TbItem(EmailComponent, { id: 'email', value: 'Email', data: '', order: 4 })
        ];
        // break;
      }
      case 'fullName': {
        //  console.log('Address');
        return [
          new TbItem(FullNameComponent, { id: 'fullName', value: 'Full Name', value1: 'First Name', value2: 'Last Name', firstName: '', lastName: '', order: 5 })
        ];
        // break;
      }
      case 'header': {
        //  console.log('Address');
        return [
          new TbItem(HeaderComponent, { id: 'header', value: 'Header', data: '', order: 6 })
        ];
        // break;
      }
      case 'lte': {
        //  console.log('Header');
        return [
          new TbItem(LongTextComponent, { id: 'lte', value: 'Long Text Entry', data: '', order: 7 })
        ];
        // break;
      }
      case 'number': {
        //  console.log('Header');
        return [
          new TbItem(NumberComponent, { id: 'number', value: 'Number', data: '', order: 8 })
        ];
        // break;
      }
      case 'phone': {
        //  console.log('Header');
        return [
          new TbItem(PhoneComponent, { id: 'phone', value: 'Phone', data: '', order: 9 })
        ];
        // break;
      }
      case 'ste': {
        //  console.log('Header');
        return [
          new TbItem(ShortTextComponent, { id: 'ste', value: 'Short Text Entry', data: '', order: 10 })
        ];
        // break;
      }
      case 'table': {
        //  console.log('Header');
        return [
          new TbItem(TableComponent, { id: 'table', value: 'Table', data: '', inComponent: false, order: 11 })
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
