import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from '../new-account/password-validation';
import { CommonApiService } from '../../../api/common-api.service'
import { GlobalVariable } from '../../../../app/global'

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit, OnDestroy {

  joinForm: FormGroup;
  newAccMsg = false;
  routeData: any;
  newAccount: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private commonApiService: CommonApiService) {
    this.joinForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword // your validation method
      });
  }


  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      this.newAccount = params['isNewAccount'];
    })
    // this.routeData = this.route.params.subscribe(params => {
    //   const newAccount = params['newAccount'];
    //   if (newAccount != null && newAccount === 'true') {
    //     this.newAccount = newAccount;
    //   }
    // });
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  onSubmit() {
    const body = {
      'password': this.joinForm.value.password,
      'confirmPassword': this.joinForm.value.confirmPassword,
      'code': this.newAccount
      // ToDo: Right now not encrypting password from client side but it is nice to have for later use
    };
    this.commonApiService.postData(GlobalVariable.RESET_PASSWORD, body)
      .subscribe(
        data => {
          this.newAccMsg = true;
        },
        err => console.log(err)
      );
  }

  cancelUser() {
    this.router.navigate(['login']);
  }
}
