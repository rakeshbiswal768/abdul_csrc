import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deviations',
  templateUrl: './deviations.component.html',
  styleUrls: ['./deviations.component.css']
})
export class DeviationsComponent implements OnInit {
  pageTitle: string = "Audit log";
  defaultUser = 'Select';
  usermodel = { user: this.defaultUser };
  userList: string[] = [
    'Matt Damon 3',
    'Matt Damon 2',
    'Matt Damon 1'
  ];
  defaultsysUser = 'Select';
  sysUsermodel = { sysuser: this.defaultsysUser };
  sysuserList: string[] = [
    'Matt Damon 3',
    'Matt Damon 2',
    'Matt Damon 1'
  ];  
  deviations: any[] = [
    {
      "spStatusDate": "Aug 11",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },
    {
      "spStatusDate": "Aug 10",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },
    {
      "spStatusDate": "Aug 10",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },
    {
      "spStatusDate": "Aug 08",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },
    {
      "spStatusDate": "Aug 07",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },    {
      "spStatusDate": "Aug 07",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    },
    {
      "spStatusDate": "Aug 02",
      "requestedBy": "Tom Clarke",
      "deviationAction": "Fields missing",
      "sysUser": "Matt Damon"
    }
  ]


  constructor() { }

  ngOnInit() {
  }

}
