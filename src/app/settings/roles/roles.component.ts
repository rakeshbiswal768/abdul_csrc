import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../app/global';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
  /* select default approvar */
  defaultUser = { 'dueDateTime': '', 'id': '', 'latestRequestStatus': '', 'name': 'Select user' };
  model = { user: this.defaultUser };
  userList = [];
  isActive = false;
  createForm: FormGroup;
  displayEdititem = 'SystemUser';
  displayitem = 'SystemUser';
  displayApprover = 'Select user';
  userTypes = [];
  userRoles: any;
  companyId: any;
  successMessage: string;
  errorMessage: string;
  editIndex: number;
  msgs: Message[] = [];
  pageTitle = 'Roles';
  userId = '';
  customMessage = 'System Users process requests, but access to settings is restricted.';
  constructor(public app: GlobalStorage, private formBuilder: FormBuilder,
    private commonApiService: CommonApiService, private messageService: MessageService) {
    this.createForm = this.formBuilder.group({
      email: ['', Validators.required]

    });
  }

  ngOnInit() {
    const companyId = sessionStorage.getItem('companyId');
    // const activeRole = localStorage.getItem('activeRole');
    this.companyId = companyId;
    this.getPossibleRoles(companyId);
    this.getAssignedRoles(companyId);
    this.getUsers(companyId);
    // this.getDefaultAssignedApprover(companyId);

  }

  getAssignedRoles(id) {
    const companyId = id;
    this.commonApiService.getData(GlobalVariable.GET_ASSIGNED_ROLES.replace('${companyId}', companyId))
      .subscribe(
        roles => {
          this.userTypes = roles;
          this.createForm.controls['email'].enable();
        },
        err => {
          console.log(err);
          if (err.error.hasErrors) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

          } else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error getting Assigned roles' }), 0);
          }
        },
        () => console.log('done')
      );
  }

  getPossibleRoles(id) {
    const companyId = id;
    this.commonApiService.getData(GlobalVariable.GET_POSSIBLE_ROLES.replace('${companyId}', companyId))
      .subscribe(
        roles => {
          this.userRoles = roles;
        },
        err => {
          console.log(err);
          if (err.error.hasErrors) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

          } else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error getting roles' }), 0);
          }
        },
        () => console.log('done')
      );
  }

  getUsers(companyId) {
    this.commonApiService.getData(GlobalVariable.GET_EMPLOYEES.replace('${companyId}', companyId))
      .subscribe(
        users => {

          this.userList = users;
          this.getDefaultAssignedApprover(companyId);
          // this.userList.unshift({ 'dueDateTime': '', 'id': '', 'latestRequestStatus': '', 'name': 'Select user' });
        },
        err => console.log(err),
        () => console.log('done')
      );

  }
  getDefaultAssignedApprover(companyId) {
    this.commonApiService.getData(GlobalVariable.GET_DEFAULT_ASSIGNED_APPROVER.replace('${companyId}', companyId))
      .subscribe(
        approver => {
          if (approver) {
            const user = this.userList.filter(item => item.id === approver.id);
            this.displayApprover = user.length !== 0 ? user['0'].name : 'Select approver';
          }
          // console.log(user);
          // this.user = approver;
          // this.userList.unshift({ 'dueDateTime': '', 'id': '', 'latestRequestStatus': '', 'name': 'Select user' });
        },
        err => console.log(err),
        () => console.log('done')
      );

  }

  changeUserRole(selectedItem: string) {
    // console.log(selectedItem);
    this.displayitem = selectedItem;
    if (this.displayitem.toLowerCase() === 'owner') {
      this.customMessage = 'The Owner is the primary person responsible for your company\'s account.' +
        'There can only be one owner, and the owner has administrator privileges.';
    } else if (this.displayitem.toLowerCase() === 'admin') {
      this.customMessage = 'Administrators can manage billing, system settings and templates,' +
        'but cannot access any customer data or process requests.';
    } else if (this.displayitem.toLowerCase() === 'systemuser') {
      this.customMessage = 'System Users process requests, but access to settings is restricted.';
    } else {
      this.customMessage = 'System Managers can manage system settings and templates, and can process and approve requests.';
    }
  }
  changeEditUserRole(selectedItem: string) {
    // console.log(selectedItem);
    this.displayEdititem = selectedItem;
  }

  editUser(userType, editIndex) {
    // this.createForm.controls['email'].setValue(userType.displayName);
    this.displayEdititem = userType.roleType;
    this.editIndex = editIndex;
  }

  assignRole(email, roleType) {
    const body = {
      'email': email,
      'roleType': roleType
    }
    const companyId = this.companyId;
    this.commonApiService.postData(GlobalVariable.ASSIGN_ROLE_TO_USER.replace('${companyId}', this.companyId), body)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Role is assigned' });
          this.editIndex = -1;
          // this.createForm.controls['email'].disable();
          // this.createForm.controls['email'].setValue('');
          this.createForm.reset();
          this.displayitem = 'SystemUser';
          this.getAssignedRoles(this.companyId);
        },
        err => {
          console.log(err);
          if (err.error.hasErrors) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.errors['0'].value }), 0);

          } else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Assigning Role' }), 0);
          }
        },
        () => console.log('done')
      );


  }


  setDefaultApprover() {
    // console.log(this.userId);
    const body = {
      'userId': this.userId
    }
    const companyId = this.companyId;
    this.commonApiService.postData(GlobalVariable.POST_DEFAULT_APPROVER.replace('${companyId}', this.companyId), body)
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

          } else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error setting Default Approver' }), 0);
          }
        },
        () => console.log('done')
      );


  }

  deleteRole(userId, roleType, email, editroleType, isEdit) {
    const companyId = this.companyId;
    this.commonApiService.deleteData(GlobalVariable.DELETE_Role_From_User.replace('${companyId}', this.companyId)
      .replace('${userId}', userId).replace('${roleType}', roleType))
      .subscribe(
        data => {
          this.userTypes = this.userTypes.filter(x => x.userId !== userId);
          this.editIndex = -1;
          if (isEdit) {
            this.assignRole(email, editroleType);
          } else {
            this.messageService.add({
              severity: 'success', summary: 'Success', detail: 'Role is removed'
            });
          }

        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error removing the role' });
        },
        () => console.log('done')
      );
  }

}

