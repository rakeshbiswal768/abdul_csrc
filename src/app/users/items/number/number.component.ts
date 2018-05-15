import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TempBuilderService } from '../temp-builder.service'
import { SharedDataService } from '../../shared-data.service'

@Component({
  selector: 'app-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.css']
})
export class NumberComponent implements OnInit {
  @Input() data: any;
  inputFocusClass = false;
  showItem = true;
  guid = '';

  constructor( @Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService) { }

  ngOnInit() {
    this.guid = this.data.guid;
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem('number', this.data, this.guid);
  }
  focusFunction() {
    this.inputFocusClass = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'number' && el.guid === guid);
    this.sharedData.templateData.splice(index, 1);
  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
