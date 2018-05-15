import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-instruction-sent',
  templateUrl: './instruction-sent.component.html',
  styleUrls: ['./instruction-sent.component.css']
})
export class InstructionSentComponent implements OnInit {
  routeData: any;
  newAccount: string = '';

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.newAccount = params['welcomeUser'];
    })
  }

}
