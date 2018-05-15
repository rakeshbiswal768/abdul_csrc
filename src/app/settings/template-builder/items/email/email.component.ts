import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TempBuilderService } from '../../temp-builder.service'
import { SharedDataService } from '../../../shared-data.service'

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  @Input() data: any;
  inputFocusClass = false;
  showItem = true;
  guid = '';
  constructor( @Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService, private sharedData: SharedDataService) { }

  ngOnInit() {
    this.guid = this.data.guid;
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem('email', this.data.value);
  }
  focusFunction() {
    this.inputFocusClass = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'email' && el.guid === guid);

    this.sharedData.templateData.splice(index, 1);

  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
