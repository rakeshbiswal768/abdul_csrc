import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CommonApiService } from '../../../api/common-api.service'
import { GlobalVariable } from '../../../../app/global'

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit, OnDestroy {

  joinForm: FormGroup;
  forgotMsg = false;
  routeData: any;
  isLinkValid = false;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private commonApiService: CommonApiService) {
    this.joinForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.routeData = this.route.params.subscribe(params => {
      const isLinkValid = params['isLinkValid'];
      if (isLinkValid != null && isLinkValid === 'true') {
        this.isLinkValid = isLinkValid;
      }
    });
  }


  ngOnDestroy() {
    this.routeData.unsubscribe();
  }
  onSubmit() {
    const body = {
      'email': this.joinForm.value.email
    };
    this.commonApiService.postData(GlobalVariable.FORGOT_PASSWORD, body)
      .subscribe(
        data => {
          // this.forgotMsg = true;
          this.router.navigate(['trial/inst-sent']);
        },
        err => console.log(err)
      );
    // this.forgotMsg = true;

  }

}
