import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from './password-validation';
import { CommonApiService } from '../../../api/common-api.service'
import { GlobalVariable } from '../../../../app/global'
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  joinForm: FormGroup;
  newAccMsg = false;
  code = 'safe';
  //routeData: any;
  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private commonApiService: CommonApiService) {
    this.joinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }

  ngOnInit() {
    // this.routeData = this.route.params.subscribe(params => {
    //   this.code = params['code'];
    // });
  }
  onSubmit() {

    const body = {
      'email': this.joinForm.value.email,
      'password': this.joinForm.value.password,
      'confirmPassword': this.joinForm.value.confirmPassword,
      'code': this.code
    };
    this.commonApiService.postData(GlobalVariable.RESET_PASSWORD, body)
      .subscribe(
        data => { this.newAccMsg = true; },
        err => console.log(err)
      );

  }
}
