import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent implements OnInit {
  title = 'SafeProfile app';
  fontSize: string = "";
  isUserLoggedIn: boolean;
  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.changeEmitted$.subscribe(userLogin => this.isUserLoggedIn = userLogin);
  }

  ngOnInit(): void {
    if (sessionStorage.getItem('fontSize')) {
      if (sessionStorage.getItem('fontSize').toLowerCase() === "large") {
        this.fontSize = '18px';
      }
      else if (sessionStorage.getItem('fontSize').toLowerCase() === "medium") {
        this.fontSize = '16px';
      }
      else {
        this.fontSize = '14px';
      }
    }
    document.getElementsByTagName('html')[0].style.fontSize = this.fontSize;
  }
}
