import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map'
import { GlobalVariable } from '../global'

@Injectable()
export class AuthenticationService {
    public token: string;
    public isUserLoggedIn: boolean;
    // Observable string sources
    private emitChangeSource = new Subject<any>();
    // Observable string streams
    changeEmitted$ = this.emitChangeSource.asObservable();
    constructor(private http: HttpClient) {
        // set token if saved in local storage
        const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.isUserLoggedIn = this.token != null;
    }

    // Service message commands
    emitChange(change: any) {
        this.emitChangeSource.next(change);
    }

    noCacheUrl(url: string): string {
        const timestamp = 't=' + ((new Date()).getTime());
        const prefix = ((url.indexOf('?') !== -1) ? '&' : '?');

        return (url + prefix + timestamp);
    }
    getReqHeader() {
        const authHeader = this.getAuthorizationHeader();
        const headers = new HttpHeaders().set('Authorization', authHeader);
        headers.append('Cache-Control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', 'Sat, 01 Jan 2200 00:00:00 GMT');
        return headers;
    }
    login(username: string, password: string): Observable<any> {
        const creds = {
            'email': username,
            'password': password
        };
        const headers = this.getReqHeader();
        headers.append('Content-Type', 'application/json');
        return this.http.post<LoginResponse>(this.noCacheUrl(GlobalVariable.BASE_API_URL + '/api/token'), creds, { headers });
        // return this.isUserLoggedIn;
    }

    getAuthorizationHeader() {
        if (this.token) {
            return 'Bearer ' + this.token;
        }
        else {
            if (sessionStorage.getItem('currentUser')) {
                const token = JSON.parse(sessionStorage.getItem('currentUser').toString());
                return 'Bearer ' + token.token;
            }
            else {
                return 'Bearer []';
            }
        }
    }


    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.isUserLoggedIn = false;
        Object.keys(sessionStorage)
            .forEach(function (k) {
                sessionStorage.removeItem(k);
            });
        sessionStorage.clear();
    }
}

export interface LoginResponse {
    access_token: string;
    accessExpiration: number;
}
