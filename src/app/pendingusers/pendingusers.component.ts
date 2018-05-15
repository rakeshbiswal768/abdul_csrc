import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-pendingusers',
  templateUrl: './pendingusers.component.html',
  styleUrls: ['./pendingusers.component.css']
})
export class PendingusersComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
  }

}
