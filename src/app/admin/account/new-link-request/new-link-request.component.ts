import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-link-request',
  templateUrl: './new-link-request.component.html',
  styleUrls: ['./new-link-request.component.css']
})
export class NewLinkRequestComponent implements OnInit {
  joinForm: FormGroup;
  forgotMsg: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.joinForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }
  ngOnInit() {
  }
  onSubmit(email) {
    //this.forgotMsg = true;
    this.router.navigate(['inst-sent']);
  }

}