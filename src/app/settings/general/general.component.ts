import { Component, OnInit } from '@angular/core';
import { GlobalVariable, GlobalStorage } from '../../../app/global';
import { CommonApiService } from '../../../app/api/common-api.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {
  defaultLang = 'English (UK)';
  companyId = '';
  accentColor = '#1da6fc';
  myLang = { lang: this.defaultLang };
  myLangP = { langP: this.defaultLang };
  langList: string[] = [
    'English (US)',
    'Danish'
  ];
  langListP: string[] = [
    'English (US)',
    'Danish'
  ];
  dateFormat = 'MM/dd/yyyy';
  dateFormatSel = this.dateFormat === 'MM/dd/yyyy';
  file: File;
  buttonColor = '#1da6fc';
  imageData: any;
  msgs: Message[] = [];
  fontSize = '';
  useHighContrast = null;
  isExpandedG = true;
  isExpandedP = false;
  classG = this.isExpandedG === false ? ' collapse collapsed' : '';
  classP = this.isExpandedP === false ? ' collapse collapsed' : '';
  showG = this.isExpandedG === true ? ' show' : '';
  showP = this.isExpandedP === true ? ' show' : '';

  constructor(public app: GlobalStorage, private commonApiService: CommonApiService, private messageService: MessageService) { }

  ngOnInit() {
    this.getGeneralSettingsInfo();
    this.getCompanyLogo();
    this.getPersonalSettingsInfo();
  }

  getGeneralSettingsInfo() {
    this.companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_COMPANY_SETTINGS_INFO.replace('${companyId}', this.companyId))
      .subscribe(
        data => {
          this.myLang.lang = data.languageCulture;
          this.dateFormat = data.dateFormat;
          this.dateFormatSel = this.dateFormat === 'MM/dd/yyyy';
          this.buttonColor = (data.buttonColor) ? data.buttonColor : '#ff514e';
          this.accentColor = data.accentColor;
        },
        err => console.log(err)
      );

  }

  getPersonalSettingsInfo() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_PERSONAL_SETTINGS.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.myLangP.langP = data.languageCulture;
          this.fontSize = data.fontSize;
          this.useHighContrast = data.useHighContrast;
        },
        err => console.log(err)
      );

  }

  setAccordion() {
    this.isExpandedG = !this.isExpandedG;
    this.isExpandedP = !this.isExpandedP;
    this.classG = this.isExpandedG === false ? ' collapse collapsed' : '';
    this.showG = this.isExpandedG === true ? ' show' : '';
    this.classP = this.isExpandedP === false ? ' collapse collapsed' : '';
    this.showP = this.isExpandedP === true ? ' show' : '';
  }
  // setAccordionP() {
  //   this.isExpandedG = !this.isExpandedG;
  //   this.isExpandedP = !this.isExpandedP;
  //   this.classP = this.isExpandedP === false ? ' collapse collapsed' : '';
  //   this.showP = this.isExpandedP === true ? ' show' : '';
  // }

  onSelectionChangeContrast(value) {
    this.useHighContrast = value === '1' ? false : true;
    console.log(this.useHighContrast);
  }
  getCompanyLogo() {
    this.companyId = sessionStorage.getItem('companyId');
    this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId)
      + '?' + new Date().getTime();
  }

  onChangeFile(event) {
    this.file = event.srcElement.files[0];
    var preview = document.querySelector('.logoPreview');
    var file = event.srcElement.files[0];
    var reader = new FileReader();
    reader.addEventListener("load", function () {
      preview.setAttribute("src",reader.result);
    }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  postGeneralSettingsInfo() {
    const companyId = sessionStorage.getItem('companyId');
    const body = new FormData();
    body.append('languageCulture', this.myLang.lang);
    body.append('dateFormat', this.dateFormat);
    body.append('buttonColor', this.buttonColor);
    body.append('accentColor', this.accentColor);
    body.append('logoFile', this.file);
    // body.append('LogoFile.ContentType', this.file.type);
    // body.append('LogoFile.ContentDisposition', 'form-data');
    // body.append('LogoFile.Headers', undefined);
    // body.append('LogoFile.Length', this.file.size.toString());
    // body.append('LogoFile.Name', this.file.name);
    // body.append('LogoFile.FileName', this.file.name);
    this.commonApiService.postDataFiles(GlobalVariable.POST_COMPANY_SETTINGS_INFO.replace('${companyId}', companyId), body)
      .subscribe(
        data => {

          sessionStorage.setItem('dateFormat', data.dateFormat);
          sessionStorage.setItem('buttonColor', data.buttonColor);
          sessionStorage.setItem('accentColor', data.accentColor);
          setTimeout(() => {

            this.imageData = GlobalVariable.BASE_API_URL + GlobalVariable.GET_PUBLIC_LOGO.replace('${companyId}', this.companyId)
              + '?' + new Date().getTime();
            document.getElementById('companyLogoNav').setAttribute('src', this.imageData);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Global Settings Saved' })
          }, 0);
        },
        err => {
          console.log(err);
          setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Saving Global Settings' }), 0);
        }
      );
  }

  postPersonalSettingsInfo() {
    const companyId = sessionStorage.getItem('companyId');
    const body = {
      'languageCulture': this.myLangP.langP,
      'fontSize': sessionStorage.getItem('fontSize'),
      'useHighContrast': this.useHighContrast
    };
    this.commonApiService.postData(GlobalVariable.POST_PERSONAL_SETTINGS.replace('${companyId}', companyId), body)
      .subscribe(
        data => {
          sessionStorage.setItem('fontSize', data.fontSize);
          sessionStorage.setItem('useHighContrast', data.useHighContrast);
          setTimeout(() => this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Personal Settings Saved' }), 0);
          if (sessionStorage.getItem('fontSize').toLowerCase() === "large") {
            this.fontSize = '18px';
          }
          else if (sessionStorage.getItem('fontSize').toLowerCase() === "medium") {
            this.fontSize = '16px';
          }
          else {
            this.fontSize = '14px';
          }
          document.getElementsByTagName('html')[0].style.fontSize = this.fontSize;
        },
        err => {
          console.log(err);
          setTimeout(() => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error Saving Personal Settings' }), 0);

        }
      );


  }
  onSelectionChange(value) {
    this.dateFormat = value === '1' ? 'MM/dd/yyyy' : 'dd/MM/yyyy';
  }
}

