import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { GeneralComponent } from '../general/general.component';
import { SharedDataService } from '../shared-data.service';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.css'],
  providers: [SharedDataService]
})
export class TabsetComponent implements OnInit, AfterViewInit {
  @Input()
  type = '';
  @ViewChild('tabs')
  private tabs: NgbTabset;
  pageTitle: string = "Settings";
  showTB: boolean = true;
  isSystemUser = true;
  isAdmin = true;
  isSysManager = true;
  displaySettings: string = 'block';
  displayTb: string = 'none';
  activeRole: string = null;
  constructor(private sharedData: SharedDataService) {
    this.sharedData.changeEmitted$.subscribe(showTB => {
      if (showTB == false) {
        this.pageTitle = 'Settings';
        this.displaySettings = 'block';
        this.displayTb = 'none';
      }
      else {
        this.pageTitle = 'Template Builder';
        this.displaySettings = 'none';
        this.displayTb = 'block';
      }
    });
  }

  public beforeChange($event: NgbTabChangeEvent) {
    // if (localStorage.getItem('isDirtyFromData')) {
    //   if (localStorage.getItem('isDirtyFromData') === "Yes") {
    //     if (confirm("You have made changes, If you leave the page the data you have input will be lost. Click 'Ok' to continue.")) {
    //       localStorage.setItem('isDirtyFromData', "");
    //     }
    //     else {
    //       $event.preventDefault();
    //     }
    //   }
    // }
  };
  ngOnInit() {
    this.activeRole = sessionStorage.getItem('activeRole').toLowerCase();
    if (this.activeRole === "owner" || this.activeRole === "admin") {
      // this.isSystemUser = true;
      this.isAdmin = true;
      //this.isSysManager = false;
    } else if (this.activeRole === "systemuser") {
      this.isSystemUser = true;
      this.isAdmin = false;
      this.isSysManager = false;
    } else {
      this.isSysManager = false;
      this.isAdmin = false;
      this.isSystemUser = true;
    }
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    setTimeout(() => this.selectTab(this.type), 0);

  }
  selectTab(activeTabId) {
    if (this.tabs) {
      this.tabs.select(activeTabId);
    }
  }

}
