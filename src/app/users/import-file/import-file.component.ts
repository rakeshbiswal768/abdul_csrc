import { Component, OnInit, ElementRef, ViewChild, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { AuthenticationService } from '../../service/authentication.service';
import { TbTemplateComponent } from '../items/tb-template.component'
import { SharedDataService } from '../shared-data.service'
import { TbComponent } from '../items/tb.component';
import { TbItem } from '../items/tb-item';
import { TempBuilderService } from '../items/temp-builder.service'
import { CommonApiService } from '../../api/common-api.service'
import { GlobalVariable, GlobalStorage } from '../../global'
import { Router, ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.css']
})
export class ImportFileComponent implements OnInit, OnDestroy {
  @ViewChild('stepper')
  stepper: MatStepper;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  uploadedFiles: any[] = [];
  categories: string[] = ['Internal'
    , 'Historical'
    , 'Financial'
    , 'External'
    , 'Tracking'
    , 'Social'];
  // autocompleteTags = [];
  isNext = true;
  routeData: any;
  msgs: Message[] = [];
  requestId = '';
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  name: string;
  dueDate: string;
  dueInDays: number;
  reqStatus = '';

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService, private sharedData: SharedDataService,
    private tbService: TempBuilderService, private commonApiService: CommonApiService, private messageService: MessageService,
    private _formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
    // this.sharedData.templateData = [];
  }
  onUpload(event) {
    for (const file of event.files) {
      const fileDetails = { 'file': file, 'name': file.name, 'autocompleteTags': [] };
      this.uploadedFiles.push(fileDetails);
      this.goForward(this.stepper);
    }
  }
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['']
    });
    this.routeData = this.route.params.subscribe(params => {
      this.requestId = params['requestId'];
      if (this.requestId !== '' && this.requestId != null && this.requestId !== 'N') {
        sessionStorage.setItem('requestId', this.requestId);
      }
    });
    if (this.requestId === '' || this.requestId == null || this.requestId === 'N') {
      this.requestId = sessionStorage.getItem('requestId');
    }
    this.name = sessionStorage.getItem('name');
    this.dueDate = sessionStorage.getItem('dueDate');
    this.dueInDays = +sessionStorage.getItem('dueInDays');
    this.reqStatus = sessionStorage.getItem('reqStatus');
    this.getInformationTypes();
    this.dropdownSettings = {
      singleSelection: false,
      text: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  sendData() {
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

  getInformationTypes() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_INFORMATIONTYPES_COMPANYID.replace('${companyId}', companyId))
      .subscribe(
        data => {
          data.forEach(element => {
            const infoType = { 'id': element.id, 'itemName': element.name };
            this.dropdownList.push(infoType);
          });
        },
        err => {
          console.log(err);
        }
      );
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
  cancelAction() {
    this.router.navigate(['/users/user-profile-req/' + this.requestId + '/' + this.reqStatus + '/'
      + this.dueInDays.toString() + '/' + this.name + '/' + this.dueDate]);
  }

  goForward(stepper: MatStepper) {
    stepper.next();

    this.isNext = false;
  }

  setBtn(stepper: MatStepper) {
    // stepper.next();

    this.isNext = stepper.selectedIndex === 0 ? true : false;
  }


  import() {
    const companyId = sessionStorage.getItem('companyId');
    const body = new FormData();
    let count = 0;
    let infoTypeLst = '';
    for (const fileDetails of this.uploadedFiles) {
      count++;
      body.append('Files', fileDetails.file);
      infoTypeLst += fileDetails.autocompleteTags.map(tag => tag.id).join(',');
      infoTypeLst += count === this.uploadedFiles.length ? '' : '|';
    }
    body.append('InformationTypeIds', infoTypeLst);
    body.append('Name', 'ReqName');
    this.commonApiService.postDataFiles(GlobalVariable.ADD_FILES_REQUEST.replace('${companyId}', companyId)
      .replace('${requestId}', this.requestId), body)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
          this.getLatestRequestStatus(this.requestId, companyId);


        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
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

}
