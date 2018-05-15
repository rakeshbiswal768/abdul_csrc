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

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService, private commonApiService: CommonApiService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
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

}
