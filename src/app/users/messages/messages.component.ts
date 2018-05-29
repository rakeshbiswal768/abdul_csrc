import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { Router } from '@angular/router';
import { NgbTabset } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.emitChange(authenticationService.isUserLoggedIn);
  }

  ngOnInit() {
  }

}
