import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  userName: any;
  userEmail: any;
  userPassword: any;
  userConfirmPassword: any;
  userNameError = false;
  userEmailError = false;
  userPasswordError = false;
  userConfirmPasswordError = false;
  confirmPasswordErrorWording = 'Invalid password';

  constructor(
    private router: Router,
    private accountService: AccountService
    ) {  }

  ngOnInit() {
  }

  goToLogIn() {
    this.router.navigateByUrl('/login');
  }

  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  signUpClick() {
    if (this.signUpCheck()) {
      return;
    }
    console.log('ready to sign up');
    const signUpInfo = {
      username: this.userName,
      password: this.userPassword,
      group_name: this.randomAssignGroup(),
      email: this.userEmail
    };
    this.accountService.signUp(signUpInfo).subscribe( data => {
      console.log(data);
      // TODO: show some notification when successfully signed up

      if(data.error) {
        // TODO: show error message for failed sign up
        console.log('failed to sign up');
        return;
      }

      this.accountService.setUserBasicInfo(signUpInfo);
      // TODO: show success info for sign up
      this.router.navigateByUrl('/login');
    });
  }

  signUpCheck() {
    this.userNameValidJudge();
    this.userEmailValidJudge();
    this.userPasswordValidJudge();
    this.userConfirmPasswordJudge();

    return this.userNameError
      && this.userEmailError
      && this.userPasswordError
      && this.userConfirmPasswordError;
  }

  userNameValidJudge() {
    if (this.userName) {
      this.userNameError = false;
    } else {
      this.userNameError = true;
    }
  }

  userEmailValidJudge() {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.userEmail)) {
      this.userEmailError = false;
    } else {
      this.userEmailError = true;
    }
  }

  userPasswordValidJudge() {
    if (this.userPassword) {
      this.userPasswordError = false;
    } else {
      this.userPasswordError = true;
    }
  }

  userConfirmPasswordJudge() {
    if (!this.userConfirmPassword) {
      this.confirmPasswordErrorWording = 'Invalid password';
      this.userConfirmPasswordError = true;
    } else if (this.userConfirmPassword !== this.userPassword) {
      // 如果填写了confirm password
      console.log(this.userConfirmPassword, this.userPassword);
      this.userConfirmPasswordError = true;
      this.confirmPasswordErrorWording = 'Please input same password number';
    } else {
      this.userConfirmPasswordError = false;
    }
  }

  randomAssignGroup() {
    const randomAssign = Math.random() * 10;
    if (randomAssign < 3.5) {
      return 'BA';
    } else if (randomAssign >= 3.5 && randomAssign <= 7) {
      return 'BC';
    } else {
      return 'CO';
    }
  }
}

