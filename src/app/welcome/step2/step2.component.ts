import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../service/authentication.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
    selector: 'app-step2',
    templateUrl: './step2.component.html',
    styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {
    loginForm: FormGroup;
    error = '';
    serverError = null;
    buttonColor = '#1da6fc';
    accentColor = '#1da6fc';
    constructor(private authenticationService: AuthenticationService, private router: Router,
        private formBuilder: FormBuilder, private commonApiService: CommonApiService, public loader: NgxSmartLoaderService) {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
    }
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
    }

    registerUser() {
        this.router.navigate(['/new-account']);
    }

    loginApp(username, password) {
        this.loader.start('myLoader');
        this.error = '';
        this.authenticationService.isUserLoggedIn = true;
        this.authenticationService.login(username, password)
            .subscribe(response => {
                const token = response.access_token;
                if (token) {
                    this.authenticationService.token = token;
                    sessionStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.authenticationService.isUserLoggedIn = true;
                    this.getCompanyInfo();
                    this.loader.stop('myLoader');
                    return true;
                } else {
                    this.serverError = null;
                    this.error = 'Username or password is incorrect';
                    this.loader.stop('myLoader');
                }
            },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                    this.loader.stop('myLoader');
                    // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error importing File(s)' });
                }
            );
    }

    getCompanyInfo() {
        this.commonApiService.getData(GlobalVariable.GET_COMPANIES)
            .subscribe(
                comp => {
                    if (comp.length > 0) {
                        this.commonApiService.companyId = comp['0'].id;
                        sessionStorage.setItem('companyId', comp['0'].id);
                        this.getCurrentUserInfo();
                        this.getContactInfo();
                        this.getGeneralSettingsInfo();
                        this.getPersonalSettingsInfo();
                    } else {
                        this.serverError = null;
                        this.error = "Something wrong with Company or Credentials";
                        this.authenticationService.logout();
                    }
                    this.loader.stop('myLoader');
                },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                    this.loader.stop('myLoader');
                }
            );
    }

    getCurrentUserInfo() {
        const companyId = sessionStorage.getItem('companyId');
        this.commonApiService.getData(GlobalVariable.GET_CURRENT_USER.replace('${companyId}', companyId))
            .subscribe(
                data => {
                    let roleList = [];
                    data.roles.forEach(element => {
                        roleList.push(element.roleType);
                    });
                    sessionStorage.setItem('assignUserId', data.id);
                    sessionStorage.setItem('profileName', data.name);
                    sessionStorage.setItem('roleType', JSON.stringify(roleList));
                    if (roleList.findIndex(el => el.toLowerCase() === 'admin' || el.toLowerCase() === 'owner') !== -1) {
                        this.router.navigate(['settings']);
                    }
                    else {
                        this.router.navigate(['dashboard']);
                    }
                },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                }
            );
    }

    getPersonalSettingsInfo() {
        const companyId = sessionStorage.getItem('companyId');
        this.commonApiService.getData(GlobalVariable.GET_PERSONAL_SETTINGS.replace('${companyId}', companyId))
            .subscribe(
                data => {
                    sessionStorage.setItem('fontSize', data.fontSize);
                    sessionStorage.setItem('useHighContrast', data.useHighContrast);
                },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                }
            );
    }

    getGeneralSettingsInfo() {
        const companyId = sessionStorage.getItem('companyId');
        this.commonApiService.getData(GlobalVariable.GET_COMPANY_SETTINGS_INFO.replace('${companyId}', companyId))
            .subscribe(
                data => {
                    this.buttonColor = (data.buttonColor) ? data.buttonColor : '#1da6fc';
                    this.accentColor = (data.accentColor) ? data.accentColor : '#1da6fc';
                    sessionStorage.setItem('dateFormat', data.dateFormat);
                    sessionStorage.setItem('buttonColor', data.buttonColor);
                    sessionStorage.setItem('accentColor', data.accentColor);
                    // this.file = data.logoFile;
                },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                }
            );

    }
    getContactInfo() {
        const companyId = sessionStorage.getItem('companyId');
        this.commonApiService.getData(GlobalVariable.GET_CONTACT_INFO.replace('${companyId}', companyId))
            .subscribe(
                data => {
                    sessionStorage.setItem('profileName', data.firstName + ' ' + data.lastName);
                },
                err => {
                    if (err.status == 400) {
                        this.serverError = err.error.Error;
                    }
                }
            );
    }
    onSubmit(username, password, event: any) {
        if (event != null && event.keyCode === 13) {
            this.loginApp(username, password)
        }

    }




}
