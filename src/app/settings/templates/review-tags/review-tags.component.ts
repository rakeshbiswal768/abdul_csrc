import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-tags',
  templateUrl: './review-tags.component.html',
  styleUrls: ['./review-tags.component.css']
})
export class ReviewTagsComponent implements OnInit {
  title = 'Review data tags';
  titleHelpTxt = 'We recommend that you don\'t edit the tags unless you have a strong reason to do so. If you do decide to edit them, this can be done later in Settings. See the link below for more info.';
  titleHelpTxtLink = 'Learn more about data tags';
  masterHelpTxt = 'Data tags are used to indicate the types of information contained in each record or file you add to the system. When your clients request data, they will select the data they want to request based on these data tags.';
  items = [];

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

}
