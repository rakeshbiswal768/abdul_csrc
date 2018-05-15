import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';
import { TabsetComponent } from './tabset/tabset.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSmartLoaderService } from 'ngx-smart-loader';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit, OnDestroy {
  routeData: any;
  type = '';
  constructor(private authenticationService: AuthenticationService, private router: Router,
    private route: ActivatedRoute, private loader: NgxSmartLoaderService) {
    // this.authenticationService.isUserLoggedIn = true;
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
    this.loader.start('myLoader');
    this.routeData = this.route.params.subscribe(params => {
      this.type = params['type'];
    });
    this.loader.stop('myLoader');
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }


}
