import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TempBuilderService } from '../temp-builder.service'
import { SharedDataService } from '../../shared-data.service'

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent implements OnInit {
  @Input() data: any;
  inputFocusClass = false;
  showItem = true;
  value: Date;
  guid = '';

  constructor(@Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService) {

  }

  ngOnInit() {
    this.guid = this.data.guid;
    if (this.data.inComponent && this.data.data) {
      console.log(this.data.data);
      this.value = new Date(this.data.data);
      if (Object.prototype.toString.call(this.value) === "[object Date]" && isNaN(this.value.getTime())) {
        this.value = null;
      }
    }
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    this.data.data = this.value;
    this.sharedData.setDataToTemplateItem('date', this.data, this.guid);
    console.log(this.data);
  }
  focusFunction() {
    this.inputFocusClass = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'date' && el.guid === guid);
    this.sharedData.templateData.splice(index, 1);
  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
