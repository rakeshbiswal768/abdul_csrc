import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-sector',
  templateUrl: './select-sector.component.html',
  styleUrls: ['./select-sector.component.css']
})
export class SelectSectorComponent implements OnInit {
  title:string = "Select a template for your sector";
  titleHelpTxt:string = "Each template is customized based on the data typically collected in your sector.";
  titleHelpTxtLink: string = "Learn more about sector templates";
  isSelected: boolean = false;


  constructor() { }

  ngOnInit() {
  }

}
