import { Component, OnInit, Input } from '@angular/core';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../../app/global';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';


@Component({
  selector: 'app-assignees',
  templateUrl: './assignees.component.html',
  styleUrls: ['./assignees.component.css']
})
export class AssigneesComponent implements OnInit {
  userList = [];
  displayApprover = '';
  displayAssignee = '';
  reqDetails: any;
  @Input() requestId = '';
  assignee = '';
  userId = '';
  assignUserId = '';
  usrName = '';
  msgs: Message[] = [];
  editApprover = false;
  editAssignee = false;
  assigneeName = '';
  canEditApprover = false;
  tempUserAssignee = '';
  serverError = null;
  loader: boolean = true;

  constructor(private commonApiService: CommonApiService, private messageService: MessageService,
    public app: GlobalStorage) { }

  ngOnInit() {
    const companyId = sessionStorage.getItem('companyId');

    if (this.requestId == null) {
      this.requestId = sessionStorage.getItem('requestId');
    }

    this.getimportedFiles(companyId);
    //    if (!this.serverError) {
    this.getUsers(companyId);
    //    }
  }


  getimportedFiles(companyId) {
    this.commonApiService.getPlainData(GlobalVariable.GET_REQUEST
      .replace('${companyId}', companyId).replace('${requestId}', this.requestId))
      .subscribe(
        data => {
          this.reqDetails = data;
          this.assignee = this.reqDetails.assignedTo;
          // this.usrName = this.reqDetails.firstName + ' ' + this.reqDetails.lastName;
          this.displayApprover = this.reqDetails.approvingUser;
          //  let userRoles = JSON.parse(sessionStorage.getItem('roleType'));
          // this.canEditApprover = userRoles.findIndex(el => el.toLowerCase() === 'systemmanager') !== -1;
          if (data.approvingUser == null && this.reqDetails.requestStatus.toLowerCase() === 'pendingapproval') {
            this.getDefaultAssignedApprover(companyId);
          }
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
          this.loader = false;
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors[0].value; }
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
          this.loader = false;
        },
        () => console.log('done')
      );
  }

  getUsers(companyId) {
    this.commonApiService.getData(GlobalVariable.GET_EMPLOYEES.replace('${companyId}', companyId))
      .subscribe(
        users => {
          this.userList = users;

        },
        err => console.log(err),
        () => console.log('done')
      );

  }

  assignUser() {
    if (this.checkPermissionsForAssignee()) {
      const companyId = sessionStorage.getItem('companyId');
      const body = {
        "assignUserId": this.assignUserId
      }
      this.commonApiService.putData(GlobalVariable.PUT_ASSIGN_TO_USER.replace('${companyId}', companyId)
        .replace('${requestId}', this.requestId), body)
        .subscribe(
          data => {
            this.editAssignee = false;
            //this.getimportedFiles(companyId);
            this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'New user is assigned'
            });
            this.assignee = this.tempUserAssignee;
          },
          err => {
            console.log(err);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error assigning user' });
            this.tempUserAssignee = '';
          },
          () => console.log('done')
        );
    }
    else {
      setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Insufficient permissions to assign user' }), 0);
    }
  }

  setDefaultAssignee() {
    this.editAssignee = false;
  }
  getDefaultAssignedApprover(companyId) {
    this.commonApiService.getData(GlobalVariable.GET_DEFAULT_ASSIGNED_APPROVER.replace('${companyId}', companyId))
      .subscribe(
        approver => {
          const user = this.userList.filter(item => item.id === approver.id);
          this.displayApprover = user.length !== 0 ? user['0'].name : 'Select approver';
        },
        err => console.log(err),
        () => console.log('done')
      );

  }
  checkPermissionsForAssignee() {
    let userRoles = JSON.parse(sessionStorage.getItem('roleType'));
    if (userRoles.findIndex(el => el.toLowerCase() === 'systemmanager') !== -1 || this.assignee === sessionStorage.getItem('profileName').toString()) {
      return true;
    }
    return false;
  }

  checkPermissionsForApprover() {
    let userRoles = JSON.parse(sessionStorage.getItem('roleType'));
    if (userRoles.findIndex(el => el.toLowerCase() === 'systemmanager') !== -1 || this.assignee === sessionStorage.getItem('profileName').toString()) {
      return true;
    }
    return false;
  }
  setDefaultApprover() {
    if (this.checkPermissionsForApprover()) {
      // console.log(this.userId);
      const body = {
        'userId': this.userId
      }
      const companyId = sessionStorage.getItem('companyId');
      this.commonApiService.putData(GlobalVariable.PUT_ASSIGN_APPROVER
        .replace('${companyId}', companyId).replace('${requestId}', this.requestId) + '?assignUserId=' + this.userId, '')
        .subscribe(
          data => {
            this.editApprover = false;
            //this.getimportedFiles(companyId);
            this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Approver is changed'
            });
          },
          err => {
            console.log(err);
            if (err.error.hasErrors) {
              setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

            }
            else {
              setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error changing Approver' }), 0);
            }
          },
          () => console.log('done')
        );

    }
    else {
      setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only System Manager can assign approver' }), 0);
    }
  }
}
