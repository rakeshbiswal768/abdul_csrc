import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GlobalVariable } from '../global';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class CommonApiService {
  public companyId: any;
  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {

  }

  getReqHeader() {
    const authHeader = this.authenticationService.getAuthorizationHeader();
    const headers = new HttpHeaders().set('Authorization', authHeader);
    headers.append('Cache-Control', 'no-cache');
    headers.append('Cache-control', 'no-store');
    headers.append('Pragma', 'no-cache');
    headers.append('Expires', 'Sat, 01 Jan 2200 00:00:00 GMT');
    return headers;
  }

  noCacheUrl(url: string): string {
    const timestamp = 't=' + ((new Date()).getTime());
    const prefix = ((url.indexOf('?') !== -1) ? '&' : '?');

    return (url + prefix + timestamp);
  }
  getData(apiPath): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.get(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), { headers });
  }

  getPlainData(apiPath): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.get(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), { headers });
  }

  getImageData(apiPath): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.get(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), { responseType: 'blob', headers })
      .map(res => {
        return new Blob([res], { type: 'application/octet-stream', });
      });

  }

  postData(apiPath, body): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.post(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), body, { headers });
  }

  postDataFiles(apiPath, body): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.post(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), body, { headers });

  }

  putData(apiPath, body): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.put(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), body, { headers });

  }
  putJsonData(apiPath, body): Observable<any> {
    const headers = this.getReqHeader();
    headers.append('Content-Type', 'application/json');
    return this.http.put(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), body, { headers });

  }

  patchData(apiPath, body): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.patch(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), body, { headers });

  }

  deleteData(apiPath): Observable<any> {
    const headers = this.getReqHeader();
    return this.http.delete(this.noCacheUrl(GlobalVariable.BASE_API_URL + apiPath), { headers });

  }

  // private handleError(error: Response) {
  //   // console.error(error);
  //   // this.authenticationService.logout();
  //   // this.router.navigate(['login']);

  //   return Observable.throw(error.json().error || 'Server error');
  // }
}
