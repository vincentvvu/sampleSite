import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    
    private router: Router,
    
    private accountService: AccountService,
  ) { }
  
  

  ngOnInit(): void {
  }
  goToSignUp() {
    this.router.navigateByUrl('/signup');
  }

  goToLogIn() {
    this.router.navigateByUrl('/login');
  }
  signIn() {
    
    const signInInfo = {
      username: this.username,
      password: this.password
    };
    console.log(signInInfo)
    this.accountService.signIn(signInInfo).subscribe(data => {
        console.log('response: '+data)
          // if (data.error) {
            
          //   alert('login failed');
          // }

          // this.accountService.retrieveUserDetails(data.username).subscribe(data =>{
          //   console.log(data);
          //   if (data.error) {
          //     // TODO: show error
          //   }

          //   this.accountService.setUserDetails(data);
          //   this.router.navigateByUrl('/dashboard');
          // });
        });   


    // this.process_data();

  }

}
