import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ClientService {
  private emitChangeClient = new Subject<any>();
  // Observable string streams
  changeClientEmitted$ = this.emitChangeClient.asObservable();
  constructor() { }

  // Service message commands
  emitClientChange(change: any) {
    this.emitChangeClient.next(change);
  }

}
