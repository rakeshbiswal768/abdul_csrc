import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TempBuilderService } from '../temp-builder.service';
import { SharedDataService } from '../../shared-data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.css']
})
export class DateRangeComponent implements OnInit {
  @Input() data: any;
  inputFocusClass = false;
  showItem = true;
  valueFrom: Date;
  valueTo: Date;
  guid = '';
  msgs: Message[] = [];

  constructor(@Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService, private messageService: MessageService) { }

  ngOnInit() {
    this.guid = this.data.guid;
    if (this.data.inComponent && this.data.valueFrom != null && this.data.valueTo != null) {
      this.valueFrom = new Date(this.data.valueFrom);
      this.valueTo = new Date(this.data.valueTo);
    }
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    if (this.valueTo && this.valueFrom) {
      if (new Date(this.valueTo) < new Date(this.valueFrom)) {
        this.valueTo = null;
        this.valueFrom = null;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'End Date cannot be before start date' });
      }
      else {
        this.data.valueFrom = this.valueFrom;
        this.data.valueTo = this.valueTo;
        this.sharedData.setDataToTemplateItem('dateRange', this.data, this.guid);
      }
    }
    else {
      this.data.valueFrom = this.valueFrom;
      this.data.valueTo = this.valueTo;
      this.sharedData.setDataToTemplateItem('dateRange', this.data, this.guid);
    }

  }
  focusFunction() {
    this.inputFocusClass = false;
  }


  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'dateRange' && el.guid === guid);
    this.sharedData.templateData.splice(index, 1);
  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
