import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-input-forms',
  templateUrl: './select-input-forms.component.html',
  styleUrls: ['./select-input-forms.component.css']
})
export class SelectInputFormsComponent implements OnInit {
  title = 'Select some input forms';
  titleHelpTxt = 'you can customize these later, or build your own form scratch. But selecting some prebuilt ones will often give you a good starting point. look for forms with information similar to what you will be collecting.';
  titleHelpTxtLink = 'Learn more about input forms';
  items = [];
  isSelected: boolean = false;

  constructor() {
    this.items = [
      { ifName: 'Contact' },
      { ifName: 'Demographic' },
      { ifName: 'Profile' },
      { ifName: 'Authentication' },
      { ifName: 'Historical' },
      { ifName: 'Contact_2' },
      { ifName: 'Demographic_2' },
      { ifName: 'Profile_2' },
      { ifName: 'Authentication_2' },
      { ifName: 'Historical_2' }
    ];
  }

  ngOnInit() {
  }
  selectInputForms(event) {
    // var elems = document.querySelectorAll(".selected");
    // [].forEach.call(elems, function (el) {
    //   el.classList.remove("selected");
    // });
    event.target.classList.add('selected');
  }

}
