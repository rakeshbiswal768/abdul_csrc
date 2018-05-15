import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../../service/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalStorage } from '../../../global';

@Component({
  selector: 'app-data-encrpt',
  templateUrl: './data-encrpt.component.html',
  styleUrls: ['./data-encrpt.component.css']
})
export class DataEncrptComponent implements OnInit, OnDestroy {
  showLock = true;
  routeData: any;
  name = '';
  unm: object;

  constructor(public app: GlobalStorage, private authenticationService: AuthenticationService,
    private router: Router, private route: ActivatedRoute) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.name = params['name'];

    });
    if (this.name != null || this.name === '') {
      this.name = sessionStorage.getItem('name');
    }
    this.unm = this.name.split(' ', 2);
    setTimeout(() => {
      this.showLock = false;
    }, 3000);
  }

  closeProfile() {
    this.router.navigate(['dashboard']);
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

}
