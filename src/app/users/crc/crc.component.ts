import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';

@Component({
  selector: 'app-crc',
  templateUrl: './crc.component.html',
  styleUrls: ['./crc.component.scss']
})
export class CrcComponent implements OnInit {

  public uploadedFiles: any[] = []
  public dropdownList: any[] = [{ 'id': 1, 'itemName': 'name1' }, { 'id': 2, 'itemName': 'name2' }];
  public dropdownSettings = {};

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService, private commonApiService: CommonApiService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {

    this.dropdownSettings = {
      singleSelection: false,
      text: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };

  }

  public filters: any[] = [
    { name: 'Identyfying', val: 6, class: 'none' },
    { name: 'Authenticating', val: 32, class: 'none' },
    { name: 'Physical Characteristics', val: 6, class: 'none' },
    { name: 'Demographic', val: 23, class: 'active' },
    { name: 'Knowledge & Beliefs', val: 9, class: 'none' },
    { name: 'Preferences', val: 0, class: 'none' },
    { name: 'Transactions', val: 9, class: 'none' },
  ]

  public profile: any[] = [
    { ifName: 'Contact', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '100%', probarOK: 'progressOk' },
    { ifName: 'Demographic', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '70%', probarOK: 'progressinComp' },
    { ifName: 'Profile', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '30%', probarOK: 'progressinComp' },
    { ifName: 'Authentication', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '30%', probarOK: 'progressinComp' }
  ]

  public media: any[] = [
    { ifName: 'Contact', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '100%', probarOK: 'progressOk' },
    { ifName: 'Demographic', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '70%', probarOK: 'progressinComp' },
    { ifName: 'Profile', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '30%', probarOK: 'progressinComp' },
    { ifName: 'Authentication', field_1: 'Name', field_2: 'Phone', field_3: 'Address', field_4: 'etc...', img: 'attached-file.png', probar: '30%', probarOK: 'progressinComp' }
  ]

  public financial: any[] = [

  ]

  public tags: any[] = [
    { fName: 'backup_3.zip', tag: ['identifying', 'Authenticating', 'unAuthenticating'] },
    { fName: 'backup_3.zip', tag: ['identifying', 'unAuthenticating'] },
    { fName: 'backup_3.zip', tag: ['identifying', 'Authenticating', 'unAuthenticating'] }
  ]

  onUpload(event) {
    for (const file of event.files) {
      const fileDetails = { 'file': file, 'name': file.name, 'autocompleteTags': [] };
      this.uploadedFiles.push(fileDetails);
      // this.goForward(this.stepper);
    }
  }

  onItemSelect(item: any) {
    // console.log(item);
    // console.log(this.selectedItems);
  }
  OnItemDeSelect(item: any) {
    // console.log(item);
    // console.log(this.selectedItems);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }
  onDeSelectAll(items: any) {
    // console.log(items);
  }


}
