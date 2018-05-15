import { Component, OnInit, Input, Inject, forwardRef, ViewChild } from '@angular/core';
import { SharedDataService } from '../../shared-data.service'
import { TbTemplateComponent } from '../../items/tb-template.component'
import { TbComponent } from '../../items/tb.component';
import { TbItem } from '../../items/tb-item';
import { Guid } from '../../items/guid'

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css']
})
export class AddButtonComponent implements OnInit {
  showItem = true;
  @Input() data: any;
  //@ViewChild(forwardRef(() => TbTemplateComponent))
  //tbTempAddBtn: TbTemplateComponent;
  guid = '';

  constructor(private sharedData: SharedDataService, @Inject(forwardRef(() => TbTemplateComponent)) private tbTempAddBtn: TbTemplateComponent) {
  }

  ngOnInit() {
    this.guid = this.data.guid;
  }


  addItem(id) {
    this.tbTempAddBtn.loadComponent(id, '', null, false);
  }
}
