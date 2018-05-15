import { Component, OnInit } from '@angular/core';
import { GlobalStorage } from '../../../global';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.css']
})
export class ConversationsComponent implements OnInit {
  name: string = "Tom Clark";

  constructor(public app: GlobalStorage) { }

  ngOnInit() {
  }

}
