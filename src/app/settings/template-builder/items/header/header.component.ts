import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { TempBuilderService } from '../../temp-builder.service'
import { SharedDataService } from '../../../shared-data.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
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
    this.sharedData.setDataToTemplateItem('header', this.data.value);
  }
  focusFunction() {
    this.inputFocusClass = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'header' && el.guid === guid);

    this.sharedData.templateData.splice(index, 1);

  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
