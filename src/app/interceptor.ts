
import { Injectable, Injector } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './service/authentication.service'

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
    authenticationService: AuthenticationService;
    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth header from the service.
        this.authenticationService = this.injector.get(AuthenticationService);
        const authHeader = this.authenticationService.getAuthorizationHeader();

        const headers = req.headers.set('Authorization', authHeader);
        headers.append('Cache-Control', 'no-cache');
        headers.append('Pragma', 'no-cache');
        headers.append('Expires', 'Sat, 01 Jan 2200 00:00:00 GMT');

        // Clone the request to add the new header.
        const authReq = req.clone({ headers: headers });
        // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
