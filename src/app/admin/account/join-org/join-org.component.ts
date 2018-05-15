import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-join-org',
  templateUrl: './join-org.component.html',
  styleUrls: ['./join-org.component.css']
})
export class JoinOrgComponent implements OnInit {

  joinForm: FormGroup;
  joinMsg: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder) {
    this.joinForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
  }
  onSubmit(email) {
    this.joinMsg = true;
  }
}
