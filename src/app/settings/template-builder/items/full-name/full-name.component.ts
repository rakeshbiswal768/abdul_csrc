import { Component, OnInit, Input, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TempBuilderService } from '../../temp-builder.service'
import { SharedDataService } from '../../../shared-data.service'

@Component({
  selector: 'app-full-name',
  templateUrl: './full-name.component.html',
  styleUrls: ['./full-name.component.css']
})
export class FullNameComponent implements OnInit {
  @Input() data: any;
  createForm: FormGroup;
  inputFocusClass = false;
  showItem = true;
  guid = '';
  constructor(private formBuilder: FormBuilder, @Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService) {
    this.createForm = this.formBuilder.group({
      firstName: [''],
      lastName: ['']
    });
  }

  ngOnInit() {
    this.guid = this.data.guid;
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem('fullName', this.data.value);
  }
  focusFunction() {
    this.inputFocusClass = false;
  }

  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'fullName' && el.guid === guid);

    this.sharedData.templateData.splice(index, 1);

  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }

}
