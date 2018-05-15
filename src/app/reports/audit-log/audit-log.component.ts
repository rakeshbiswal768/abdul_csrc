import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonApiService } from '../../api/common-api.service';
import { GlobalVariable } from '../../global';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css']
})
export class AuditLogComponent implements OnInit {
  pageTitle = 'Audit log';
  displayUser = 'Select';
  exportFilename = 'download';
  actionfilter = 'Select';
  csvSeparator = ',';
  reqUser = '';
  userList = [];
  auditlog = [];
  filterAction = [];
  filterdAlog = [];
  constructor(private commonApiService: CommonApiService) { }

  ngOnInit() {
    this.getAuditLog();
    this.getUsers();
  }

  exportCSV() {
    const data = this.auditlog;
    let csv = '\ufeff';

    csv = '"Date","Requested By","Action taken","","System user"';

    // body
    data.forEach((record, i) => {
      csv += '\n';
      let j = 0;
      for (const key in record) {
        if (record.hasOwnProperty(key)) {
          csv += '"' + record[key] + '"';
          if (j < (Object.keys(record).length - 1)) {
            csv += this.csvSeparator;
          }
          j++;
        }
      }
      // csv += this.csvSeparator;

    });

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });

    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, this.exportFilename + '.csv');
    } else {
      const link = document.createElement('a');
      link.style.display = 'none';
      document.body.appendChild(link);
      if (link.download !== undefined) {
        link.setAttribute('href', URL.createObjectURL(blob));
        link.setAttribute('download', this.exportFilename + '.csv');
        link.click();
      } else {
        csv = 'data:text/csv;charset=utf-8,' + csv;
        window.open(encodeURI(csv));
      }
      document.body.removeChild(link);
    }
  }

  getAuditLog() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_ACTIVITY_LOG.replace('${companyId}', companyId))
      .subscribe(
        data => {
          this.auditlog = data;
          this.auditlog.forEach(element => {
            this.filterAction.push(element.activityType);
          })
          let set = new Set(this.filterAction);
          set.forEach(ele => {
            this.filterdAlog.push(ele);
          })
        },
        err => console.log(err)
      );
  }

  getUsers() {
    const companyId = sessionStorage.getItem('companyId');
    this.commonApiService.getData(GlobalVariable.GET_USERS_LOG.replace('${companyId}', companyId))
      .subscribe(
        users => {
          const user = { 'latestRequestId': null, 'id': '', 'name': 'All Users', 'latestRequestStatus': null, 'dueDateTime': null };
          this.userList = users;
          this.userList.unshift(user);
        },
        err => console.log(err)
      );

  }
}
