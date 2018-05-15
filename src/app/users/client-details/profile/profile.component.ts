import { Component, OnInit, EventEmitter, Output, Input, AfterContentInit } from '@angular/core';
import { ClientService } from '../client.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable, GlobalStorage } from '../../../global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterContentInit {
  createForm: FormGroup;
  defaultRequest = '';
  successMessage = '';
  errorMessage = '';
  requestmodel = { request: this.defaultRequest };
  @Output() clientName = new EventEmitter<string>();
  @Input() requestId = '';
  companyId: string;
  isDirtyFN = '';
  isDirtyLN = '';
  isDirtyEM = '';
  isDirtyVM = '';
  isDirtyAN = '';
  requestList: string[] = [
    'Phone',
    'Revision',
    'Other'
  ];
  serverError = null;
  loader: boolean = true;

  constructor(public app: GlobalStorage, private clientService: ClientService,
    private formBuilder: FormBuilder, private commonApiService: CommonApiService) {
    this.createForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      request: [''],
      additionalNotes: [''],
      verificationMethod: ['']
    });
  }

  ngOnInit() {


  }

  ngAfterContentInit() {
    this.companyId = sessionStorage.getItem('companyId');

    if (this.requestId == null) {
      this.requestId = sessionStorage.getItem('requestId');
    }

    this.getRequestData(this.requestId);
  }

  focusOutFunction(name) {
    //
    switch (name) {
      case 'firstName':
        this.isDirtyFN = this.createForm.controls[name].value !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      case 'lastName':
        this.isDirtyLN = this.createForm.controls[name].value !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      case 'email':
        this.isDirtyEM = this.createForm.controls[name].value !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      case 'additionalNotes':
        this.isDirtyAN = this.createForm.controls[name].value !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      case 'verificationMethod':
        this.isDirtyVM = this.createForm.controls[name].value !== '' ? 'is-upgraded is-focused' : 'is-upgraded';
        break;
      default:
        break;
    }
  }
  focusFunction(name) {
    switch (name) {
      case 'firstName':
        this.isDirtyFN = 'is-upgraded is-focused';
        break;
      case 'lastName':
        this.isDirtyLN = 'is-upgraded is-focused';
        break;
      case 'email':
        this.isDirtyEM = 'is-upgraded is-focused';
        break;
      case 'additionalNotes':
        this.isDirtyAN = 'is-upgraded is-focused';
        break;
      case 'verificationMethod':
        this.isDirtyVM = 'is-upgraded is-focused';
        break;
      default:
        break;
    }
  }
  getRequestData(requestId) {
    if (this.requestId == null || this.requestId === '' || this.requestId === 'New') { return; }
    this.commonApiService.getData(GlobalVariable.GET_REQUEST.replace('${companyId}',
      this.companyId).replace('${requestId}', this.requestId))
      .subscribe(
        data => { // /api/Company/CompanyInformation/{companyId}
          this.createForm.controls['email'].setValue(data.userEmail != null ? data.userEmail : '');
          this.createForm.controls['firstName'].setValue(data.firstName != null ? data.firstName : '');
          this.createForm.controls['lastName'].setValue(data.lastName != null ? data.lastName : '');
          this.createForm.controls['additionalNotes'].setValue(data.additionalNotes != null ? data.additionalNotes : '');
          this.createForm.controls['verificationMethod'].setValue(data.verificationMethod != null ? data.verificationMethod : '');
          this.createForm.controls['request'].setValue(data.requestReason != null ? data.requestReason : '');
          this.isDirtyFN = 'is-upgraded is-dirty';
          this.isDirtyLN = 'is-upgraded is-dirty';
          this.isDirtyEM = 'is-upgraded is-dirty';
          this.isDirtyVM = 'is-upgraded is-dirty';
          this.isDirtyAN = 'is-upgraded is-dirty';

          this.clientName.emit(this.createForm.value.firstName + ' ' + this.createForm.value.lastName);
          sessionStorage.setItem('name', this.createForm.value.firstName + ' ' + this.createForm.value.lastName);
          this.clientService.emitClientChange(true);
          this.loader = false;
        },
        err => {
          if (err.status == 400) { this.serverError = err.error.errors[0].value; }
          this.loader = false;
        },
        () => console.log('done')
      );
  }

  saveProfile() {
    //  console.log(this.requestmodel.request);
    const body = {
      'dataDumps': [
        // {
        //   "id": "id1",
        //   "fileName": "id1",
        //   "name": "string",
        //   "fileSize": 0,
        //   "tags": [
        //     "string"
        //   ]
        // }
      ],
      'requestId': this.requestId === 'New' ? '' : this.requestId,
      'userEmail': this.createForm.value.email,
      'firstName': this.createForm.value.firstName,
      'lastName': this.createForm.value.lastName,
      'additionalNotes': this.createForm.value.additionalNotes,
      'verificationMethod': this.createForm.value.verificationMethod,
      'requestReason': this.createForm.value.request,
      'requestStatus': 'Approved',
      'dueDate': '2018-05-22T18:12:59.956Z'
    };

    // this.clientService.emitClientChange(true);
    this.commonApiService.postData(GlobalVariable.CREATE_REQUEST.replace('${companyId}', this.companyId), body)
      .subscribe(
        data => {
          this.clientName.emit(this.createForm.value.firstName + ' ' + this.createForm.value.lastName);
          this.clientService.emitClientChange(true);
          this.requestId = data.requestId;
          sessionStorage.setItem('requestId', data.requestId);
          this.successMessage = 'Successfully created new request';
          this.errorMessage = null;
        },
        err => {
          console.log(err);
          this.successMessage = null;
          this.errorMessage = 'Error in creating Request';
        }
      );
  }

}
