import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from './client.service'
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../global';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { SharedDataService } from '../shared-data.service';
import { MenuItem, ConfirmationService } from 'primeng/primeng';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tabs')
  private tabs: NgbTabset;
  userName: string;
  isProfileSaved = true;
  activeTabId = 'ClientProfile';
  routeData: any;
  requestId = '';
  dueDate = '';
  reqStatus = '';
  display = false;
  name: string;
  dueInDays: number;
  isApprover = sessionStorage.getItem('isApprover') === 'true';
  msgs: Message[] = [];
  items: MenuItem[];
  showRecords = false;
  informationTypeId = '';
  displayAddDataWarning = false;
  link = '';

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService, private router: Router, private messageService: MessageService,
    private route: ActivatedRoute, private clientService: ClientService, private cdRef: ChangeDetectorRef,
    private commonApiService: CommonApiService, private sharedData: SharedDataService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
    this.clientService.changeClientEmitted$.subscribe(value => this.isProfileSaved = value);
  }

  ngOnInit() {

    this.routeData = this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
      this.reqStatus = params['reqStatus'] === 'N' ? '' : params['reqStatus'];
      this.userName = params['name'];
      this.dueDate = params['dueDate'];
      this.activeTabId = params['activeTabId'];
    });

    if (this.requestId === '' || this.requestId == null) {
      this.requestId = sessionStorage.getItem('requestId');
    }
    this.name = sessionStorage.getItem('name');
    this.dueDate = sessionStorage.getItem('dueDate');
    this.dueInDays = +sessionStorage.getItem('dueInDays');
    this.reqStatus = sessionStorage.getItem('reqStatus');
    this.isProfileSaved = this.reqStatus !== '';

    this.items = [];
    this.getimportedFiles();
    this.getReqCategories();
  }


  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  ngAfterViewInit() {
    // if (this.activeTabId != null && this.activeTabId !== '') {
    //   this.selectTab(this.activeTabId)
    // }
    this.tabs.select(this.activeTabId);
    this.cdRef.detectChanges();
  }

  clientName(name: string) {
    this.userName = name;
  }
  selectTab(activeTabId) {
    this.showRecords = false;
    if (this.tabs) {
      this.tabs.select(activeTabId);
    }
  }

  closeProfile() {
    this.router.navigate(['dashboard']);
  }

  cancelRequest() {
    this.display = true;

  }

  addData(link) {
    this.link = link;
    if (this.isApprover) {
      this.displayAddDataWarning = true;
    }
    else {
      this.router.navigate(['/users/' + this.link + '/' + this.requestId])
    }
  }

  goToLink(confirmation) {
    this.displayAddDataWarning = false;
    if (confirmation === 'yes') {
      this.router.navigate(['/users/' + this.link + '/' + this.requestId])
    }
  }

  readyForApprove() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.putData(GlobalVariable.PUT_READY_FOR_APPROVE.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Data sent for approval' });
          this.router.navigate(['dashboard']);
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error sending data' });
        },
        () => console.log('done')
      );

  }

  sendData() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.putData(GlobalVariable.PUT_APPROVE_REQUEST.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
          this.router.navigate(['users/data-encrpt/' + this.name]);
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Approving request' });
        }
      );

  }

  cancelReadyDelivery() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.putData(GlobalVariable.PUT_CANCEL_READY_FOR_APPROVE.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          sessionStorage.setItem('reqStatus', 'Incomplete');
          this.getLatestRequestStatus(this.requestId, companyId);

        },
        err => {
          console.log(err);
        }
      );
  }

  cancelDelivery() {
    this.display = false
    const companyId = sessionStorage.getItem('companyId');

    this.commonApiService.putData(GlobalVariable.PUT_CANCEL_REQUEST.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), '')
      .subscribe(
        data => {
          this.getLatestRequestStatus(this.requestId, companyId);
        },
        err => {
          console.log(err);
        },
        () => console.log('done')
      );
  }

  getLatestRequestStatus(requestId, companyId) {

    this.commonApiService.getData(GlobalVariable.GET_REQUEST.replace('${companyId}',
      companyId).replace('${requestId}', requestId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.reqStatus = data.requestStatus;
          this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
            + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);

        },
        err => {
          console.log(err);

        }
      );

  }

  getDefaultAssignedApprover() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_DEFAULT_ASSIGNED_APPROVER.replace('${companyId}', companyId))
      .subscribe(
        approver => {
          if (approver.id === sessionStorage.getItem('assignUserId').toString()) {
            this.isApprover = true;
            this.setDefaultApprover(approver.id);
          }
          else {
            this.isApprover = false;
          }
          sessionStorage.setItem('isApprover', this.isApprover.toString());
        },
        err => console.log(err),
        () => console.log('done')
      );

  }

  setDefaultApprover(userId) {
    const body = {
      'userId': userId
    }
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.putData(GlobalVariable.PUT_ASSIGN_APPROVER
      .replace('${companyId}', companyId).replace('${requestId}', this.requestId) + '?assignUserId=' + userId, '')
      .subscribe(
        data => {
          this.messageService.add({
            severity: 'success', summary: 'Success', detail: 'Default Approver is set'
          });
        },
        err => {
          console.log(err);
          if (err.error.hasErrors) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

          }
          else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error setting Approver' }), 0);
          }
        },
        () => console.log('done')
      );



  }
  getimportedFiles() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_REQUEST
      .replace('${companyId}', companyId).replace('${requestId}', this.requestId))
      .subscribe(
        data => {
          if (this.reqStatus.toLowerCase() === 'pendingapproval' || this.reqStatus.toLowerCase() === 'incomplete') {
            if (data.approvingUser == null && this.reqStatus.toLowerCase() === 'pendingapproval') {
              this.getDefaultAssignedApprover();

            }
            else
              if (data.approvingUser === sessionStorage.getItem('profileName').toString()) {
                this.isApprover = true;
              }
              else {
                this.isApprover = false;
              }
          }
          sessionStorage.setItem('isApprover', this.isApprover.toString());
          if (data.assignedTo == null) {
            let userRoles = JSON.parse(sessionStorage.getItem('roleType'));
            if (userRoles.findIndex(el => el.toLowerCase() === 'systemmanager' || el.toLowerCase() === 'systemuser') !== -1) {
              this.assignUser();
            }


          }
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
        },
        err => {
          console.log(err);
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
        },
        () => console.log('done')
      );
  }

  assignUser() {
    const companyId = sessionStorage.getItem('companyId');
    const body = {
      "assignUserId": sessionStorage.getItem('assignUserId')
    }
    this.commonApiService.putData(GlobalVariable.PUT_ASSIGN_TO_USER.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), body)
      .subscribe(
        data => {
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error assigning user' });
        },
        () => console.log('done')
      );

  }
  getReqCategories() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_CATEGORIES)
      .subscribe(
        data => {
          const reqCat = [];
          data.forEach(subCat => {
            const cats = [];
            const itemCat = {
              label: subCat.name,
              items: cats
            };
            subCat.subCategories.forEach(element => {
              const items = [];
              const item = {
                label: element.name,
                items: items
              };
              element.informationTypes.forEach(cat => {
                const label = {
                  label: cat.name, command: (event) => {
                    // setTimeout(() => {
                    // this.router.navigate(['/users/import-data/' + this.requestId + '/' + cat.id]);
                    //  }, 0);
                    this.showRecords = false;
                    this.showRecords = true;
                    this.informationTypeId = cat.id;
                    this.sharedData.emitTempChangeId(cat.id);

                  }
                };
                item.items.push(label);
              });
              itemCat.items.push(item);
            });
            reqCat.push(itemCat);
          });
          this.items = reqCat;
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
        },
        err => {
          console.log(err);
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
        },
        () => console.log('done')
      );
  }


}
