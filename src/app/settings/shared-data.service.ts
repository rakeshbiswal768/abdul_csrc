import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

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
  constructor() { }

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

  setDataToTemplateItem(id, data) {
    if (data != null && data !== '') {
      this.templateData.forEach(element => {
        if (element.id === id) {
          element.data = data;
        }
      });
    }
  }

}
