import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalStorage } from '../../global';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  msgNotification: string = "3";

  constructor(private router: Router, public app: GlobalStorage) { }

  ngOnInit() {
  }
  // getButtonColor()
  // {
  // return sessionStorage.getItem('buttonColor');
  // }

  goToMessages() {
    this.router.navigate(['users/messages']);
  }

}
