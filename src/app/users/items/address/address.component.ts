import { Component, OnInit, Inject, forwardRef, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TbComponent } from '../tb.component';
import { TempBuilderService } from '../temp-builder.service'
import { SharedDataService } from '../../shared-data.service'

@Component({
  selector: 'app-tb-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Input() data: any;
  createForm: FormGroup;
  inputFocusClass = false;
  showItem = true;
  guid = '';

  constructor(private formBuilder: FormBuilder, @Inject(forwardRef(() => TempBuilderService)) private tbService: TempBuilderService,
    private sharedData: SharedDataService) {
    this.createForm = this.formBuilder.group({
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      postalCode: ['']
    });

  }

  ngOnInit() {
    this.guid = this.data.guid;
    this.createForm.controls['addressLine1'].setValue(this.data.addressLine1);
    this.createForm.controls['addressLine2'].setValue(this.data.addressLine2);
    this.createForm.controls['city'].setValue(this.data.city);
    this.createForm.controls['postalCode'].setValue(this.data.postalCode);
  }

  focusOutFunction() {
    this.inputFocusClass = true;
    this.sharedData.setDataToTemplateItem('address', this.createForm.value, this.guid);
    console.log(this.createForm.value);
  }
  focusFunction() {

    this.inputFocusClass = false;
  }


  deleteItem(guid) {
    this.showItem = false;
    const index = this.sharedData.templateData.findIndex(el => el.id === 'address' && el.guid === guid);
    this.sharedData.templateData.splice(index, 1);
  }

  openSettings(data) {
    this.tbService.emitChangeNav(data);
  }
}


