import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesDialog } from './category-dialog/categories';
import { CommonApiService } from '../../../api/common-api.service';
import { GlobalVariable } from '../../../global';
import { forEach } from '@angular/router/src/utils/collection';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { SharedDataService } from '../../shared-data.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-imported-files',
  templateUrl: './imported-files.component.html',
  styleUrls: ['./imported-files.component.css']
})
export class ImportedFilesComponent implements OnInit {
  @Input()
  requestId = '';
  ischecked = true;
  importedfiles: any;
  dataDump = [];
  requestDataId = '';
  fragmentId = '';
  msgs: Message[] = [];
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  autocompleteTags = [];
  display = false;
  fileExtension: string = '';
  @Input() informationTypeId: string;

  constructor(private router: Router, public dialog: MatDialog, private commonApiService: CommonApiService,
    private messageService: MessageService, private sharedData: SharedDataService) {
    this.sharedData.emitTemplateId$.subscribe(id => this.getRequestDatafromInfoType(id));
  }

  openDialogItem(itemType, popoverItemId) {
    document.getElementById('fileItem_' + popoverItemId).style.display = "block";
    this.editCategories(itemType, popoverItemId);
  }
  cancelInfoTypeEdit(pId) {
    document.getElementById('fileItem_' + pId).removeAttribute("style");
  }
  ngOnInit() {
    if (this.requestId === '' || this.requestId == null) {
      this.requestId = sessionStorage.getItem('requestId');
    }
    this.dropdownSettings = {
      singleSelection: false,
      text: '',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      enableSearchFilter: true,
      classes: 'myclass custom-class'
    };
    this.getRequestDatafromInfoType(this.informationTypeId);
    this.getInformationTypes();
  }

  goToImportFile() {
    this.router.navigate(['users/import-file/' + this.requestId]);
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
        },
        () => console.log('done')
      );
  }

  getRequestDatafromInfoType(infoTypeId) {

    const requestId = sessionStorage.getItem('requestId');
    this.commonApiService.getData(GlobalVariable.GET_REQUESTDATA_ID.replace('${requestId}', requestId)
      + '/?informationTypeId=' + infoTypeId)
      .subscribe(
        data => {
          this.dataDump = [];
          data.forEach(element => {
            if (element.storageId !== null) {
              // this.importedfiles = data;
              this.dataDump.push(element);
            }
          });


        },
        err => {
          console.log(err);
          if (err.error) {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error }), 0);

          }
          else {
            setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error fetching the records' }), 0);
          }
        },
        () => console.log('done')
      );

  }


  getReqCategories() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getPlainData(GlobalVariable.GET_REQUEST_CATEGORIES
      .replace('${companyId}', companyId).replace('${requestId}', this.requestId))
      .subscribe(
        data => {
          // this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File(s) imported' });
        },
        err => {
          console.log(err);
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
        },
        () => console.log('done')
      );
  }
  viewFile(id, fileName) {
    // const tab = window.open();
    this.commonApiService.getImageData(GlobalVariable.GET_FILE_FOR_DOWNLOAD.replace('${requestDataId}', id))
      .subscribe(
        data => {
          const fileUrl = URL.createObjectURL(data);
          const anchor = document.createElement('a');
          anchor.download = fileName;
          anchor.href = fileUrl;
          anchor.click();
        },
        err => {
          console.log(err);
        },
        () => console.log('done')
      );
  }
  editCategories(tags, id) {
    this.requestDataId = id;
    this.autocompleteTags = [];
    tags.forEach(element => {
      const infoType = { 'id': element.id, 'itemName': element.name };
      this.autocompleteTags.push(infoType);
    });

    this.display = true;
  }

  updateInfoTypes() {
    const informationTypeIds = [];
    this.autocompleteTags.forEach(element => {
      informationTypeIds.push(element.id);
    });

    const body = {
      'informationTypeIds': informationTypeIds
    }

    this.commonApiService.patchData(GlobalVariable.PATCH_REQUESTDATA_ID.replace('${requestDataId}', this.requestDataId), body)
      .subscribe(
        data => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Information type modified' });
          this.display = false;
          this.getRequestDatafromInfoType(this.informationTypeId);
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error editing Information type' });
        },
        () => console.log('done')
      );
  }

  deleteFile(fragmentId) {
    this.commonApiService.deleteData(GlobalVariable.DELETE_REQUESTDATA.replace('${requestDataId}', fragmentId))
      .subscribe(
        data => {
          this.dataDump = this.dataDump.filter(x => x.id !== fragmentId);
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'File deleted' });
        },
        err => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error deleting the file' });
        },
        () => console.log('done')
      );
  }

}
